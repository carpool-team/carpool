import { ITokenPayload } from "../../components/auth/interfaces/ITokenPayload";
import { ILoginSuccessAction, LoginActionTypes } from "../../components/auth/store/Types";
import store, { getState } from "../../store/Index";
import { AppState } from "../../store/Reducers";
import { RequestEndpoint } from "../enum/RequestEndpoint";
import { RequestType } from "../enum/RequestType";
import { getRequestEndpoint, getUrl } from "../Helper";
import { IRequestProperties } from "../interfaces/IRequestProperties";
import ResponseCore from "../responses/ResponseCore";
import RequestBody from "./RequestBody";

export const tempCoords = {
	latitude: 0,
	longitude: 0,
};

export default abstract class RequestCore {
	//#region class fields
	requestProperties: IRequestProperties;
	requestBody?: RequestBody;

	private static headers: string[][] = [["Content-Type", "application/json"]];
	//#endregion

	abstract send(): Promise<any>;

	constructor(init: { properties: IRequestProperties }) {
		this.requestProperties = init.properties;
	}

	/** internal request parser for JWT to get rid of circular dependencies */
	private parseJwt(token: string): ITokenPayload {
		let base64Url = token.split(".")[1];
		let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		let jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
			return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(""));
		return JSON.parse(jsonPayload) as ITokenPayload;
	}

	private refreshToken(): Promise<any> {
		const tokenInfo = getState().auth?.tokenInfo;
		const headers = [...RequestCore.headers];
		if (tokenInfo && tokenInfo.expires < new Date()) {
			const refreshTokenUrl = process.env.AUTH_URL + getRequestEndpoint(RequestEndpoint.REFRESH_TOKEN);
			return fetch(refreshTokenUrl, {
				method: RequestType.Post,
				headers: new Headers(headers),
				body: JSON.stringify({ value: tokenInfo.refreshToken }),
			}).then(res => {
				if (res.ok) {
					return res.json();
				} else {
					return undefined;
				}
			})
				.then(response => {
					if (response) {
						store.dispatch(<ILoginSuccessAction>{
							type: LoginActionTypes.LoginSuccess,
							tokenInfo: {
								refreshToken: response.result.refreshToken,
								token: response.result.token,
								expires: response.result.expires,
								payload: this.parseJwt(response.result.token),
							},
						});
					}
				});
		} else {
			return new Promise(res => res(undefined));
		}
	}

	protected fetch<R extends ResponseCore>(): Promise<R> {
		const endpoint = getRequestEndpoint(
			this.requestProperties.endpoint,
			this.requestProperties.queries
		);
		const headers = [...RequestCore.headers];
		const state: AppState = getState();
		if (state.auth?.tokenInfo?.token) {
			headers.push(["Authorization", `Bearer ${state.auth.tokenInfo.token}`]);
		}
		const apiUrl: string = getUrl(this.requestProperties.endpoint);

		const url: string = `${apiUrl}${endpoint}`;
		return this.refreshToken()
			.then(() => fetch(url, {
				method: this.requestProperties.method,
				headers: new Headers(headers),
				body: this.requestBody ? JSON.stringify(this.requestBody) : null,
			})).then(res => {
				if (res.ok) {
					return res.json() as Promise<R>;
				} else {
					console.log("Something went wrong...");
					return res.json() as Promise<R>;
				}
			}).then(res2 => {
				console.log("Response for url " + url + " -> ", res2);
				return res2 as R;
			});
	}
}

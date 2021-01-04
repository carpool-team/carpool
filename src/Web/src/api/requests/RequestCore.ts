import { getState } from "../../store/Index";
import { AppState } from "../../store/Reducers";
import { getRequestEndpoint, getRequestType, getUrl } from "../Helper";
import { IRequestProperties } from "../interfaces/IRequestProperties";
import ResponseCore from "../responses/ResponseCore";
import RequestBody from "./RequestBody";

export const tempCoords = {
	latitude: 52.408141,
	longitude: 16.926712,
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

	protected fetch<R extends ResponseCore>(): Promise<R> {
		const method = getRequestType(this.requestProperties.method);
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
		return new Promise((resolve, reject) => resolve(undefined))
			.then(() => fetch(url, {
				method,
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

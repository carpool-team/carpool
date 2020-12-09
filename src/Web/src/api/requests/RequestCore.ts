import store, { getState } from "../../store/Index";
import { AppState } from "../../store/Reducers";
import { getRequestEndpoint, getRequestType, isAuthEndpoint } from "../Helper";
import { IRequestProperties } from "../interfaces/IRequestProperties";
import ResponseCore from "../responses/ResponseCore";
import RequestBody from "./RequestBody";

export const tempCoords = {
	latitude: 0,
	longitude: 0,
};
export const tempClientId: string = "TYMCZASOWE_ID_KLIENTA"; // todo: zaorać

export default abstract class RequestCore {
	//#region class fields
	requestProperties: IRequestProperties;
	requestBody?: RequestBody;

	private static config = {
		devUrl: "https://carpool-rest.azurewebsites.net/api",
		devAuthUrl: "https://carpool-identity.azurewebsites.net/api",
		proxyUrl: "https://cors-anywhere.herokuapp.com/",
	};

	//#endregion

	abstract send(): Promise<any>;

	constructor(init: {
		properties: IRequestProperties
	}) {
		this.requestProperties = init.properties;
	}

	protected async fetch<R extends ResponseCore>(): Promise<R> {
		const method = getRequestType(this.requestProperties.method);
		const endpoint = getRequestEndpoint(
			this.requestProperties.endpoint,
			this.requestProperties.queries
		);
		const headers: Headers = new Headers({
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": '*',
		});
		const state: AppState = getState();

		const apiUrl: string = isAuthEndpoint(this.requestProperties.endpoint)
			? RequestCore.config.devAuthUrl
			: RequestCore.config.devUrl;

		if (state.auth?.tokenInfo?.token) {
			headers.append("Authorization", `Bearer ${state.auth.tokenInfo.token}`);
		}

		const url: string = `${RequestCore.config.proxyUrl}${apiUrl}${endpoint}`;

		const req: RequestInit = {
			body: this.requestBody ? JSON.stringify(this.requestBody) : undefined,
			headers,
			method,
			mode: "cors",
		};

		const result = await fetch(url, req).then(async (res: Response) => {
			if (res.ok) {
				const json = await res.json();
				console.debug("RESPONSE: ", {
					req,
					url,
					json
				});
				return (json as R);
			} else {
				throw res.statusText;
			}
		});
		return result;
	}

}

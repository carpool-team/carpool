import { getRequestEndpoint, getRequestType, isAuthEndpoint } from "../Helper";
import { IRequest } from "../interfaces/IRequest";
import { IRequestProperties } from "../interfaces/IRequestProperties";
import ResponseCore from "../responses/ResponseCore";
import RequestBody from "./RequestBody";

export const tempUserId: string = "ba5c33df-0c92-4324-19c7-08d8778cb545";
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
		devUrl: "https://carpool-rest-api.azurewebsites.net/api",
		devAuthUrl: "https://carpool-auth.azurewebsites.net/api",
		userId: tempUserId,
	};
	private static proxyUrl: string = "https://cors-anywhere.herokuapp.com/";
	private static headers = {
		"Content-Type": "application/json",
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
		const request: IRequest = {
			method,
			headers: RequestCore.headers,
		};
		if (this.requestBody) {
			request.body = JSON.stringify(this.requestBody);
		}
		const apiUrl: string = isAuthEndpoint(this.requestProperties.endpoint)
			? RequestCore.config.devAuthUrl
			: RequestCore.config.devUrl;
		const url: string = `${RequestCore.proxyUrl}${apiUrl}${endpoint}`;
		const res = await fetch(url, request);
		const json = await res.json();
		console.debug("RESPONSE: ", {
			request,
			url,
			json
		});
		return json as R;
	}

}

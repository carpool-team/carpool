import { getRequestEndpoint, getRequestType } from "../Helper";
import { IRequest } from "../interfaces/IRequest";
import { IRequestProperties } from "../interfaces/IRequestProperties";
import ResponseCore from "../responses/ResponseCore";
import RequestBody from "./RequestBody";

export const tempUserId: string = "8151a9b2-52ee-4ce0-a2dd-08d7f7744d91";

export default abstract class RequestCore {
	//#region class fields
	requestProperties: IRequestProperties;
	requestBody?: RequestBody;

	private static config = {
		devUrl: "https://carpool-rest-api.azurewebsites.net/api",
		userId: tempUserId
	}
	private static proxyUrl: string = "https://cors-anywhere.herokuapp.com/";
	private static headers = {
		"Content-Type": "application/json",
	};
	//#endregion

	abstract send: () => any;

	constructor(properties: IRequestProperties) {
		this.requestProperties = properties;
	}

	protected fetch = async<R extends ResponseCore>() => {
		const method = getRequestType(this.requestProperties.method);
		const endpoint = getRequestEndpoint(
			this.requestProperties.endpoint,
			this.requestProperties.queries
		);
		let request: IRequest = {
			method,
			headers: RequestCore.headers,
		};
		if (this.requestBody) {
			request.body = JSON.stringify(this.requestBody);
		}

		console.log("URL: ", `${RequestCore.proxyUrl}${RequestCore.config.devUrl}${endpoint}`);
		console.log("REQ: ", request);
		const res = await fetch(`${RequestCore.proxyUrl}${RequestCore.config.devUrl}${endpoint}`, request);

		const json = await res.json();
		return json as R;
	}

}

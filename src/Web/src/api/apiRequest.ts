import { RequestType } from "./enum/RequestType";
import { RequestEndpoint } from "./enum/RequestEndpoint";
import { getRequestEndpoint, getRequestType } from "./Helper";
import { tempUserId } from "./useRequest";

export interface IRequest {
	method: string;
	headers: any;
	body?: any;
}
export interface IRequestProps {
	method: RequestType;
	endpoint: RequestEndpoint;
	userId?: string;
	groupId?: string;
	inviteId?: string;
	rideId?: string;
	body?: any;
}

export const apiRequest = async (props: IRequestProps) => {
	try {
		const config = {
			devUrl: "https://carpool-rest-api.azurewebsites.net/api",
			userId: tempUserId,
		};
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const headers = {
			"Content-Type": "application/json",
		};
		const method = getRequestType(props.method);
		const endpoint = getRequestEndpoint(
			props.endpoint,
			props.userId,
			props.groupId,
			props.inviteId,
			props.rideId,
		);
		let request: IRequest = {
			method,
			headers,
		};
		if (props.body) {
			request.body = JSON.stringify(props.body);
		}

		console.log("URL: ", `${proxyUrl}${config.devUrl}${endpoint}`);
		console.log("REQ: ", request);
		const res = await fetch(`${proxyUrl}${config.devUrl}${endpoint}`, request);

		if (res.status === 409) {
			// TODO obsłużyć komunikat jeżeli kod grupy istnieje już w bazie
			console.log("Kod grupy istnieje już w bazie", res.status);
		} else if (res.status > 399) {
			console.log("Status Error", res);
		} else {
			const json = await res.json();
			return json;
		}
	} catch (error) {
		return error;
	}
};

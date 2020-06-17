import React, { useState, useEffect } from "react";
import { RequestType } from "./enum/RequestType";
import { RequestEndpoint } from "./enum/RequestEndpoint";
import { getRequestEndpoint, getRequestType } from "./Helper";

interface IRequest {
	method: string;
	headers: any;
	body?: any;
}
interface IRequestProps {
	method: RequestType;
	endpoint: RequestEndpoint;
	userId?: string;
	body?: any;
}

const useRequest = (props: IRequestProps) => {
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const config = {
		devUrl: "https://carpool-rest-api.azurewebsites.net/api",
		userId: "8151a9b2-52ee-4ce0-a2dd-08d7f7744d91",
	};

	const _execute = async () => {
		try {
			setLoading(true);

			const headers = { "Content-Type": "application/json" };
			const method = getRequestType(props.method);
			const endpoint = getRequestEndpoint(props.endpoint, props.userId);
			let request: IRequest = {
				method,
				headers,
			};
			if (props.body) {
				request.body = JSON.stringify(props.body);
			}

			const res = await fetch(`${config.devUrl}${endpoint}`, request);

			if (res.status > 399) {
				setError("Error occured");
			} else {
				const json = await res.json();
				setResponse(json);
			}
		} catch (error) {
			setError(error);
			console.log("ERROR OCCURED", error);
		} finally {
			setLoading(false);
		}
	};

	return [response, loading, error, _execute];
};

export default useRequest;

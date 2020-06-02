import { RequestType } from "./enum/RequestType";
import { RequestEndpoint } from "./enum/RequestEndpoint";
import { getRequestEndpoint, getRequestType } from "./Helper";

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
  body?: any;
}

export const apiRequest = async (props: IRequestProps) => {
  try {
    const config = {
      devUrl: "https://carpool-rest-api.azurewebsites.net/api",
      userId: "8151a9b2-52ee-4ce0-a2dd-08d7f7744d91",
    };
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const headers = {
      "Content-Type": "application/json",
    };
    const method = getRequestType(props.method);
    const endpoint = getRequestEndpoint(
      props.endpoint,
      props.userId,
      props.groupId
    );
    let request: IRequest = {
      method,
      headers,
    };
    if (props.body) {
      request.body = JSON.stringify(props.body);
    }

    const res = await fetch(`${proxyUrl}${config.devUrl}${endpoint}`, request);

    if (res.status > 399) {
      console.log("Status Error", res);
    } else {
      const json = await res.json();
      return json;
    }
  } catch (error) {
    return error;
  }
};

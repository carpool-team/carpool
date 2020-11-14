import { RequestEndpoint } from "../enum/RequestEndpoint";
import { RequestType } from "../enum/RequestType";
import { IRequestQueries } from "./IRequestQueries";

export interface IRequestProperties {
	method: RequestType;
	endpoint: RequestEndpoint;
	queries: IRequestQueries;
}

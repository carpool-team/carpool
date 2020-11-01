import { IRequestProperties } from "../interfaces/IRequestProperties";
import RequestBody from "./RequestBody";
import RequestCore from "./RequestCore";

export default abstract class RequestBase<T extends RequestBody> extends RequestCore {
	constructor(body: T, properties: IRequestProperties) {
		super(properties);
		this.requestBody = body;
	}
}

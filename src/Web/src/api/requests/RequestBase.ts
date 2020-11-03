import { IRequestProperties } from "../interfaces/IRequestProperties";
import RequestBody from "./RequestBody";
import RequestCore from "./RequestCore";

export default abstract class RequestBase<T extends RequestBody> extends RequestCore {
	constructor(init: {
		body: T,
		properties: IRequestProperties
	}) {
		super({ properties: init.properties });
		this.requestBody = init.body;
	}
}

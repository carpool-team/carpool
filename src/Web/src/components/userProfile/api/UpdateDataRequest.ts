import { RequestEndpoint } from "../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../api/enum/RequestType";
import RequestBase from "../../../api/requests/RequestBase";
import { UpdateDataResponse } from "./UpdateDataResponse";

interface IUpdateDataRequestBody {
	email: string;
	firstName: string;
	lastName: string;
}

export class UpdateDataRequest extends RequestBase<IUpdateDataRequestBody> {
	constructor(init: {
		body: IUpdateDataRequestBody,
		appUserId: string,
	}) {
		super({
			properties: {
				method: RequestType.PUT,
				endpoint: RequestEndpoint.UPDATE_USER_DATA,
				queries: {
					userId: init.appUserId,
				}
			},
			body: init.body
		});
	}
	async send() {
		return await super.fetch<UpdateDataResponse>();
	}
}

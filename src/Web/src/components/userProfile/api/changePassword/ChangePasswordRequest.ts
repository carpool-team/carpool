import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { ChangePasswordResponse } from "./ChangePasswordResponse";

interface IChangePasswordRequestBody {
	email: string;
	currentPassword: string;
	newPassword: string;
}

export class ChangePasswordRequest extends RequestBase<IChangePasswordRequestBody> {
	constructor(init: {
		body: IChangePasswordRequestBody,
	}) {
		super({
			properties: {
				method: RequestType.Put,
				endpoint: RequestEndpoint.CHANGE_USER_PASSWORD,
				queries: null,
			},
			body: init.body
		});
	}
	async send() {
		return await super.fetch<ChangePasswordResponse>();
	}
}

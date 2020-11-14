import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { ILoginFormData } from "../../login/LoginPanel";
import { LoginResponse } from "./LoginResponse";

export interface ILoginRequestBody extends ILoginFormData {
}

export class LoginRequest extends RequestBase<ILoginRequestBody> {
	constructor(init: {
		body: ILoginRequestBody
	}) {
		super({
			properties: {
				method: RequestType.POST,
				endpoint: RequestEndpoint.LOGIN_USER,
				queries: null
			},
			body: init.body
		});
	}
	async send() {
		return await super.fetch<LoginResponse>();
	}
}

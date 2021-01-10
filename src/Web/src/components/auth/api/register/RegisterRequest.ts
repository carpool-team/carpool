import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { IRegisterFormData } from "../../register/RegisterPanel";
import { RegisterResponse } from "./RegisterResponse";

export interface IRegisterRequestBody extends IRegisterFormData {
}

export class RegisterRequest extends RequestBase<IRegisterRequestBody> {
	constructor(init: {
		body: IRegisterRequestBody
	}) {
		super({
			properties: {
				method: RequestType.Post,
				endpoint: RequestEndpoint.REGISTER_USER,
				queries: null
			},
			body: init.body
		});
	}
	async send() {
		return await super.fetch<RegisterResponse>();
	}
}

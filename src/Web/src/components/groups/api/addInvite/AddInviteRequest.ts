import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { AddInviteResponse } from "./AddInviteResponse";

export interface IAddInviteRequestBody {
	groupId: string;
	invitedAppUserId: string;
	inviterId: string;
}

export class AddInviteRequest extends RequestBase<IAddInviteRequestBody> {
	constructor(init: {
		body: IAddInviteRequestBody,
	}) {
		super({
			properties: {
				method: RequestType.Post,
				endpoint: RequestEndpoint.POST_INVITE,
				queries: null
			},
			body: init.body
		});
	}
	async send() {
		return await super.fetch<AddInviteResponse>();
	}
}

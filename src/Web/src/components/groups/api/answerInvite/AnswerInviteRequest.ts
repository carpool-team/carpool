import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { AnswerInviteResponse } from "./AnswerInviteResponse";

export interface IAnswerInviteRequestBody {
	groupInviteId: string;
	isAccepted: boolean;
}

export class AnswerInviteRequest extends RequestBase<IAnswerInviteRequestBody> {
	constructor(init: {
		groupInviteId: string,
		isAccepted: boolean,
	}) {
		super({
			properties: {
				method: RequestType.PUT,
				endpoint: RequestEndpoint.PUT_CHANGE_INVITE,
				queries: {
					inviteId: init.groupInviteId,
				}
			},
			body: {
				groupInviteId: init.groupInviteId,
				isAccepted: init.isAccepted,
			}
		});
	}
	async send() {
		return await super.fetch<AnswerInviteResponse>();
	}
}

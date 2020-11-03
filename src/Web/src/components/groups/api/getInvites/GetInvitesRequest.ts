import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore, { tempUserId } from "../../../../api/requests/RequestCore";
import { GetInvitesResponse } from "./GetInvitesResponse";

export class GetInvitesRequest extends RequestCore {
	constructor(init: {
		userOnly: boolean
	}) {
		super({
			properties: {
				method: RequestType.GET,
				endpoint: init.userOnly ? RequestEndpoint.GET_INVITES_BY_USER_ID : RequestEndpoint.GET_ALL_INVITES,
				queries: {
					userId: init.userOnly ? tempUserId : undefined
				},
			}
		});
	}
	send = async () => {
		return await super.fetch<GetInvitesResponse>();
	}
}

import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore, { tempUserId } from "../../../../api/requests/RequestCore";
import { GetGroupsResponse } from "./GetGroupsResponse";

export class GetGroupsRequest extends RequestCore {
	constructor(init: {
		userOnly: boolean
	}) {
		super({
			properties: {
				method: RequestType.GET,
				endpoint: init.userOnly ? RequestEndpoint.GET_USER_GROUPS : RequestEndpoint.GET_ALL_GROUPS,
				queries: {
					userId: init.userOnly ? tempUserId : undefined
				},
			}
		});
	}
	async send() {
		return await super.fetch<GetGroupsResponse>();
	}
}

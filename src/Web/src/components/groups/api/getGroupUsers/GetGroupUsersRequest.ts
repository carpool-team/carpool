import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { GetGroupUsersResponse } from "./GetGroupUsersResponse";

export class GetGroupUsersRequest extends RequestCore {
	constructor(groupId: string) {
		super({
			properties: {
				method: RequestType.Get,
				endpoint: RequestEndpoint.GET_GROUP_USERS,
				queries: {
					groupId,
				}
			},
		});
	}
	async send() {
		return await super.fetch<GetGroupUsersResponse>();
	}
}

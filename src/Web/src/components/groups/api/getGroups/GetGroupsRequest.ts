import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore, { tempUserId } from "../../../../api/requests/RequestCore";
import { GetGroupsResponse } from "./GetGroupsResponse";

export class GetGroupsRequest extends RequestCore {
	constructor(init: {
		userOnly: boolean,
		count?: number,
		page?: number,
	}) {
		super({
			properties: {
				method: RequestType.GET,
				endpoint: init.userOnly ? RequestEndpoint.GET_ALL_GROUPS : RequestEndpoint.GET_ALL_GROUPS,
				queries: {
					userId: init.userOnly ? tempUserId : undefined,
					page: init.page ? init.page : 0,
					count: init.count ? init.count : 9999,
				},
			}
		});
	}
	async send() {
		return await super.fetch<GetGroupsResponse>();
	}
}

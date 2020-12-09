import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { GetGroupsResponse } from "./GetGroupsResponse";

export class GetGroupsRequest extends RequestCore {
	constructor(init: {
		count?: number,
		page?: number,
		userId?: string,
	}) {
		super({
			properties: {
				method: RequestType.GET,
				endpoint: RequestEndpoint.GET_USER_GROUPS,
				queries: {
					userId: init.userId,
				},
			}
		});
	}
	async send() {
		return await super.fetch<GetGroupsResponse>();
	}
}

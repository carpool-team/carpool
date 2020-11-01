import { async } from "rxjs/internal/scheduler/async";
import { RequestEndpoint } from "../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../api/enum/RequestType";
import RequestCore, { tempUserId } from "../../../api/requests/RequestCore"
import { GetGroupsResponse } from "./GetGroupsResponse";

export class GetGroupsRequest extends RequestCore {
	constructor(userOnly: boolean) {
		super({
			method: RequestType.GET,
			endpoint: userOnly ? RequestEndpoint.GET_USER_GROUPS : RequestEndpoint.GET_ALL_GROUPS,
			queries: {
				userId: userOnly ? tempUserId : undefined
			},
		});
	}
	send = async () => {
		return await super.fetch<GetGroupsResponse>();
	}
}

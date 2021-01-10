import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { GetGroupDetailsResponse } from "./GetGroupDetailsResponse";

export class GetGroupDetailsRequest extends RequestCore {
	constructor(groupId: string) {
		super({
			properties: {
				method: RequestType.Get,
				endpoint: RequestEndpoint.GET_GROUP_BY_ID,
				queries: {
					groupId,
				},
			}
		});
	}
	async send() {
		return await super.fetch<GetGroupDetailsResponse>();
	}
}

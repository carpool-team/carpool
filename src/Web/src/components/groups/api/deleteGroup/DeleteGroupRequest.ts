import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { DeleteGroupResponse } from "./DeleteGroupResponse";

export class DeleteGroupRequest extends RequestCore {
	constructor(init: {
		groupId: string,
	}) {
		super({
			properties: {
				method: RequestType.Delete,
				endpoint: RequestEndpoint.DELETE_GROUP_BY_ID,
				queries: {
					groupId: init.groupId,
				}
			},
		});
	}
	async send() {
		return await super.fetch<DeleteGroupResponse>();
	}
}

import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { DeleteUserFromGroupResponse } from "./DeleteUserFromGroupResponse";

export class DeleteUserFromGroupRequest extends RequestCore {
	constructor(init: {
		groupId: string,
		userId: string,
	}) {
		super({
			properties: {
				method: RequestType.Delete,
				endpoint: RequestEndpoint.LEAVE_GROUP,
				queries: {
					groupId: init.groupId,
					userId: init.userId,
				}
			},
		});
	}
	async send() {
		return await super.fetch<DeleteUserFromGroupResponse>();
	}
}

import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { UpdateGroupResponse } from "./UpdateGroupResponse";

export interface IUpdateGroupRequestBody {
	ownerId?: number;
	location?: {
		latitude: number;
		longitude: number;
	};
	code?: string;
	name?: string;
}

export class UpdateGroupRequest extends RequestBase<IUpdateGroupRequestBody> {
	constructor(init: {
		body: IUpdateGroupRequestBody,
		groupId: string,
	}) {
		super({
			properties: {
				method: RequestType.POST,
				endpoint: RequestEndpoint.PUT_UPDATE_GROUP,
				queries: {
					groupId: init.groupId
				}
			},
			body: init.body
		});
	}
	async send() {
		return await super.fetch<UpdateGroupResponse>();
	}
}

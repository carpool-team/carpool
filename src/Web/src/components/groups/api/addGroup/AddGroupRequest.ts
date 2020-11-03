import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { AddGroupResponse } from "./AddGroupResponse";

export interface IAddGroupRequestBody {
	name: string;
	code: string;
	ownerId: string;
}

export class AddGroupRequest extends RequestBase<IAddGroupRequestBody> {
	constructor(init: {
		body: IAddGroupRequestBody
	}) {
		super({
			properties: {
				method: RequestType.POST,
				endpoint: RequestEndpoint.POST_ADD_GROUP,
				queries: null
			},
			body: init.body
		});
	}
	send = async () => {
		return await super.fetch<AddGroupResponse>();
	}
}

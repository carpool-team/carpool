import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { ILocation } from "../../interfaces/ILocation";
import { UpdateGroupResponse } from "./UpdateGroupResponse";

export interface IUpdateGroupRequestBody {
	ownerId?: number;
	location?: ILocation;
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
				method: RequestType.Put,
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

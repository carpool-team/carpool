import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { DeleteUserResponse } from "./DeleteUserResponse";

export class DeleteUserRequest extends RequestCore {
	constructor(appUserId: string) {
		super({
			properties: {
				method: RequestType.Delete,
				endpoint: RequestEndpoint.DELETE_USER,
				queries: {
					userId: appUserId,
				}
			},
		});
	}
	async send() {
		return await super.fetch<DeleteUserResponse>();
	}
}

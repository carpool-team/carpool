import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore, { tempUserId } from "../../../../api/requests/RequestCore";
import { GetRidesResponse } from "./GetRidesResponse";

export class GetRidesRequest extends RequestCore {
	constructor(init: {
		userOnly: boolean,
	}) {
		super({
			properties: {
				method: RequestType.GET,
				endpoint: init.userOnly ? RequestEndpoint.GET_RIDES_AVAILABLE_BY_USER_ID : RequestEndpoint.GET_ALL_RIDES,
				queries: {
					userId: init.userOnly ? tempUserId : undefined
				},
			}
		});
	}
	async send() {
		return await super.fetch<GetRidesResponse>();
	}
}

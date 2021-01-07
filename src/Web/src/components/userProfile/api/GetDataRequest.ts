import { RequestEndpoint } from "../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../api/enum/RequestType";
import RequestCore from "../../../api/requests/RequestCore";
import { GetDataResponse } from "./GetDataResponse";

export class GetDataRequest extends RequestCore {
	constructor(appUserId: string) {
		super({
			properties: {
				method: RequestType.Get,
				endpoint: RequestEndpoint.GET_USER_BY_APPUSERID,
				queries: {
					userId: appUserId,
				}
			},
		});
	}
	async send() {
		return await super.fetch<GetDataResponse>();
	}
}

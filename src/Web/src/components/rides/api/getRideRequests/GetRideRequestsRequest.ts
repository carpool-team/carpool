import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { GetRideRequestsResponse } from "./GetRideRequestsResponse";

export class GetRideRequestsRequest extends RequestCore {
	constructor(isOwner: boolean) {
		super({
			properties: {
				method: RequestType.Get,
				endpoint: RequestEndpoint.GET_RIDE_REQS,
				queries: {
					isOwner,
				},
			}
		});
	}
	async send() {
		return await super.fetch<GetRideRequestsResponse>();
	}
}

import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { DeleteRideResponse } from "./DeleteRideResponse";

export class DeleteRideRequest extends RequestCore {
	constructor(init: {
		rideId: string,
		recurring?: boolean,
	}) {
		super({
			properties: {
				method: RequestType.Delete,
				endpoint: init.recurring ? RequestEndpoint.DELETE_RIDE_RECURRING : RequestEndpoint.DELETE_RIDE,
				queries: {
					rideId: init.rideId,
				}
			},
		});
	}
	async send() {
		return await super.fetch<DeleteRideResponse>();
	}
}

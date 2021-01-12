import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { LeaveRideResponse } from "./LeaveRideResponse";

export class LeaveRideRequest extends RequestCore {
	constructor(init: {
		rideId: string,
		userId: string,
	}) {
		super({
			properties: {
				method: RequestType.Delete,
				endpoint: RequestEndpoint.LEAVE_RIDE,
				queries: {
					rideId: init.rideId,
					userId: init.userId,
				}
			},
		});
	}
	async send() {
		return await super.fetch<LeaveRideResponse>();
	}
}

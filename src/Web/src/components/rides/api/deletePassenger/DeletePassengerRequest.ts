import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { DeletePassengerResponse } from "./DeletePassengerResponse";

export class DeletePassengerRequest extends RequestCore {
	constructor(init: {
		rideId: string,
		userId: string,
	}) {
		super({
			properties: {
				method: RequestType.Delete,
				endpoint: RequestEndpoint.DELETE_RIDE_PASSENGER,
				queries: {
					rideId: init.rideId,
					userId: init.userId,
				}
			},
		});
	}
	async send() {
		return await super.fetch<DeletePassengerResponse>();
	}
}

import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { RideDirection } from "../addRide/AddRideRequest";
import { GetRidesResponse } from "./GetRidesResponse";

export class GetRidesRequest extends RequestCore {
	constructor(init: {
		userId: string,
		owned?: boolean;
		participated?: boolean;
		past?: boolean;
		groupId?: string;
		dateTime?: string;
		direction?: RideDirection;
	}) {
		if (init.groupId) {
			console.log(init);
			super({
				properties: {
					method: RequestType.Get,
					endpoint: RequestEndpoint.GET_RIDES_BY_GROUP_ID,
					queries: {
						groupId: init.groupId,
						dateTime: init.dateTime,
						rideDirection: (init.direction === RideDirection.From || init.direction === RideDirection.To) ? String(init.direction) : null,
					},
				}
			});
		} else {
			super({
				properties: {
					method: RequestType.Get,
					endpoint: RequestEndpoint.GET_RIDES_BY_USER_ID,
					queries: {
						userId: init.userId,
						owned: init.owned,
						past: init.past,
						participated: init.participated,
						rideDirection: (init.direction === RideDirection.From || init.direction === RideDirection.To) ? String(init.direction) : null,
					},
				}
			});
		}
	}
	async send() {
		return await super.fetch<GetRidesResponse>();
	}
}

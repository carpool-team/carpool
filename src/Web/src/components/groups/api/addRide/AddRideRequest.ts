import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { AddRideResponse } from "./AddRideResponse";

/** Ride direction enum */
export enum RideDirection {
	/** From point to group */
	From = 0,
	/** From group to point */
	To = 1,
	/** Both directions */
	Both = 2,
}

export interface IAddRideRequestBody {
	ownerId: string;
	groupId: string;
	location: {
		latitude: number;
		longitude: number;
	};
	rideDirection: RideDirection;
	date: Date;
	weekDays?: number;
	price: number;
}

export class AddRideRequest extends RequestBase<IAddRideRequestBody> {
	constructor(init: {
		body: IAddRideRequestBody,
		recurring: boolean,
	}) {
		super({
			properties: {
				method: RequestType.POST,
				endpoint: init.recurring ? RequestEndpoint.POST_RIDE_RECURRING : RequestEndpoint.POST_RIDE,
				queries: null
			},
			body: init.body
		});
	}
	async send() {
		return await super.fetch<AddRideResponse>();
	}
}

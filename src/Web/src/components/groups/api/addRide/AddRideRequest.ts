import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { ILocation } from "../../interfaces/ILocation";
import { AddRideResponse } from "./AddRideResponse";

/** Ride direction enum */
export enum RideDirection {
	/** From point to group */
	To = 0,
	/** From group to point */
	From = 1,
	/** Both directions */
	Both = 2,
}

export interface IAddRideRequestBody {
	ownerId: string;
	groupId: string;
	location: ILocation;
	rideDirection: RideDirection;
	date?: string;
	price: number;
	seatsLimit: number;
	weekDays?: number;
	rideTime?: string;
	startDate?: string;
	endDate?: string;
}

export class AddRideRequest extends RequestBase<IAddRideRequestBody> {
	constructor(init: {
		body: IAddRideRequestBody,
		recurring: boolean,
	}) {
		super({
			properties: {
				method: RequestType.Post,
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

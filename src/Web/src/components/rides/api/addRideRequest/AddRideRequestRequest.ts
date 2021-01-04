import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { ILocation } from "../../../groups/interfaces/ILocation";
import { AddRideRequestResponse } from "./AddRideRequestResponse";

export interface IAddRideRequestRequestBody {
	rideId: string;
	requestingUserId: string;
	rideOwnerId: string;
	location: ILocation;
}

export class AddRideRequestRequest extends RequestBase<IAddRideRequestRequestBody> {
	constructor(init: {
		body: IAddRideRequestRequestBody
	}) {
		super({
			properties: {
				method: RequestType.POST,
				endpoint: RequestEndpoint.POST_ADD_RIDE_REQ,
				queries: null
			},
			body: init.body
		});
	}
	async send() {
		return await super.fetch<AddRideRequestResponse>();
	}
}

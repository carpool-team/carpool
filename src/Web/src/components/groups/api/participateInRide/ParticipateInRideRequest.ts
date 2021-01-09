import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { ParticipateInRideResponse } from "./ParticipateInRideResponse";

export interface IParticipateInRideRequestBody {
	rideId: string;
	participandId: string;
}

export class ParticipateInRideRequest extends RequestBase<IParticipateInRideRequestBody> {
	constructor(init: {
		rideId: string,
		participantId: string
	}) {
		super({
			properties: {
				method: RequestType.Post,
				endpoint: RequestEndpoint.PUT_RIDE_ADD_PARTICIPANT,
				queries: {
					rideId: init.rideId
				},
			},
			body: {
				rideId: init.rideId,
				participandId: init.participantId,
			}
		});
	}
	async send() {
		return await super.fetch<ParticipateInRideResponse>();
	}
}

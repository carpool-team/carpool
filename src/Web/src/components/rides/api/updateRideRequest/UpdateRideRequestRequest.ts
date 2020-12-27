import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestBase from "../../../../api/requests/RequestBase";
import { UpdateRideRequestResponse } from "./UpdateRideRequestResponse";

export interface IUpdateRideRequestRequestBody {
	rideRequestId: string;
	isAccepted: boolean;
}

export class UpdateRideRequestRequest extends RequestBase<IUpdateRideRequestRequestBody> {
	constructor(init: {
		body: IUpdateRideRequestRequestBody,
	}) {
		super({
			properties: {
				method: RequestType.PUT,
				endpoint: RequestEndpoint.PUT_UPDATE_RIDE_REQ,
				queries: null
			},
			body: init.body
		});
	}
	async send() {
		return await super.fetch<UpdateRideRequestResponse>();
	}
}

import { ILocation } from "../ILocation";
import { IRideRequestRide } from "./IRideRequestRide";
import { IRideRequestUser } from "./IRideRequestUser";

export interface IRideRequest {
	isAccepted: boolean;
	isPending: boolean;
	requestingUser: IRideRequestUser;
	ride: IRideRequestRide;
	rideOwner: {
		firstName: string;
		lastName: string;
		id: string;
		rating: number;
	};
	rideRequestId: string;
}

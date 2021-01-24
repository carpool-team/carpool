import { ILocation } from "../ILocation";
import { IRideRequestRide } from "./IRideRequestRide";

export interface IRideRequest {
	isAccepted: boolean;
	isPending: boolean;
	requestingUser: {
		appUserId: string;
		firstName: string;
		lastName: string;
		location: ILocation;
	};
	ride: IRideRequestRide;
	rideOwner: {
		firstName: string;
		lastName: string;
		id: string;
		rating: number;
	};
	rideRequestId: string;
}

import { IRideRequestRide } from "./IRideRequestRide";

export interface IRideRequest {
	isAccepted: boolean;
	isPending: boolean;
	requestingUser: {
		appUserId: string;
		firstName: string;
		lastName: string;
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

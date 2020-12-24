import { IParticipant } from "./IParticipant";
import { IRide } from "./IRide";

export interface IRideRequest {
	isAccepted: boolean;
	isPending: boolean;
	requestingUser: {
		appUserId: string;
		firstName: string;
		lastName: string;
	}
	ride: IRide;
	rideOwner: IParticipant;
	rideRequestId: string;
}

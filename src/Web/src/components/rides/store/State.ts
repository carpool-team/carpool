import { IRideRequest } from "../../groups/interfaces/rideRequest/IRideRequest";

/** Rides state interface */
export interface IRidesState {
	requestsOwner: IRideRequest[];
	requestsParticipant: IRideRequest[];
}

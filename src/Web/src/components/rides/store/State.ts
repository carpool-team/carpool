import { IRideRequest } from "../../groups/interfaces/IRideRequest";

/** Rides state interface */
export interface IRidesState {
	requestsOwner: IRideRequest[];
	requestsParticipant: IRideRequest[];
}

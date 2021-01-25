import { IRideRequest } from "../../groups/interfaces/rideRequest/IRideRequest";
import { LoadingStatus } from "../../shared/enum/LoadingStatus";

/** Rides state interface */
export interface IRidesState {
	requestsOwner: IRideRequest[];
	requestsParticipant: IRideRequest[];
	loadingStatus: LoadingStatus;
}

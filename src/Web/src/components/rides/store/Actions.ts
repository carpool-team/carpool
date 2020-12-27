import {
	IGetRideRequestsAction, RideRequestsActionTypes,
} from "./Types";

//#region RIDE REQS
export function getRideRequests(owner: boolean): IGetRideRequestsAction {
	return {
		type: RideRequestsActionTypes.GetRideRequests,
		owner
	};
}
//#endregion

import {
	IAnswerRideRequestAction,
	IDeleteRideAction,
	IGetRideRequestsAction, RideActionTypes, RideRequestsActionTypes,
} from "./Types";

//#region RIDE REQS
export function getRideRequests(): IGetRideRequestsAction {
	return {
		type: RideRequestsActionTypes.GetRideRequests,
	};
}

export function answerRideRequest(id: string, isAccepted: boolean, owned: boolean): IAnswerRideRequestAction {
	return {
		type: RideRequestsActionTypes.AnswerRideRequest,
		id,
		isAccepted,
		owned,
	};
}
//#endregion

//#region RIDES
export const deleteRide: (rideId: string) => IDeleteRideAction = rideId => ({
	type: RideActionTypes.DeleteRide,
	rideId,
});
//#endregion

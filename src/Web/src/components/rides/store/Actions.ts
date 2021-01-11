import {
	IAnswerRideRequestAction,
	IGetRideRequestsAction, ILeaveRideAction, RideActionTypes, RideRequestsActionTypes,
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

export const leaveRide: (rideId: string) => ILeaveRideAction = rideId => ({
	type: RideActionTypes.LeaveRide,
	rideId,
});
//#endregion

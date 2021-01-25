import { LoadingStatus } from "../../shared/enum/LoadingStatus";
import {
	IAnswerRideRequestAction,
	IDeleteRideAction,
	IGetRideRequestsAction,
	RideActionTypes,
	RideRequestsActionTypes,
	ILeaveRideAction,
	IDeletePassengerAction,
	IRidesSetLoadingStatusAction,
	GenericActionTypes
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
export const leaveRide: (rideId: string) => ILeaveRideAction = rideId => ({
	type: RideActionTypes.LeaveRide,
	rideId,
});

export const deleteRide: (rideId: string) => IDeleteRideAction = rideId => ({
	type: RideActionTypes.DeleteRide,
	rideId,
});

export const deletePassenger: (rideId: string, userId: string) => IDeletePassengerAction = (rideId, userId) => ({
	type: RideActionTypes.DeletePassenger,
	rideId,
	userId,
});
//#endregion

//#region GENERIC
export const setLoadingStatus: (status: LoadingStatus) => IRidesSetLoadingStatusAction = status => ({
	type: GenericActionTypes.SetLoadingStatus,
	status,
});
//#endregion

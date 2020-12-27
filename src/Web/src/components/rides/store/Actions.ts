import {
	IAnswerRideRequestAction,
	IGetRideRequestsAction, RideRequestsActionTypes,
} from "./Types";

//#region RIDE REQS
export function getRideRequests(owner: boolean): IGetRideRequestsAction {
	return {
		type: RideRequestsActionTypes.GetRideRequests,
		owner
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

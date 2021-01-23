import { Action } from "redux";
import { IRideRequest } from "../../groups/interfaces/rideRequest/IRideRequest";

export enum GenericActionTypes {
	ApiError = "RIDES_STORE_API_ERROR",
	ClearStore = "RIDES_CLEAR_STORE",
}

/** Enum of ride requests actions */
export enum RideRequestsActionTypes {
	GetRideRequests = "RIDES_GET_REQUESTS",
	GetRideRequestsSuccess = "RIDES_GET_REQUESTS_SUCCESS",
	GetRideRequestsError = "RIDES_GET_REQUESTS_ERROR",
	AnswerRideRequest = "RIDES_ANSWER_REQUEST",
	AnswerRideRequestSuccess = "RIDES_ANSWER_REQUEST_SUCCESS",
	AnswerRideRequestError = "RIDES_ANSWER_REQUEST_ERROR",
}

/** Enum of ride requests actions */
export enum RideActionTypes {
	LeaveRide = "RIDES_LEAVE_RIDE",
	LeaveRideSuccess = "RIDES_LEAVE_RIDE_SUCCESS",
	LeaveRideError = "RIDES_LEAVE_RIDE_ERROR",
	DeleteRide = "RIDES_DELETE_RIDE",
	DeleteRideSuccess = "RIDES_DELETE_RIDE_SUCCESS",
	DeleteRideError = "RIDES_DELETE_RIDE_ERROR",
	DeletePassenger = "RIDES_DELETE_PASSENGER",
	DeletePassengerSuccess = "RIDES_DELETE_PASSENGER_SUCCESS",
	DeletePassengerError = "RIDES_DELETE_PASSENGER_ERROR",
}

//#region GENERIC
export interface IApiErrorAction extends Action<GenericActionTypes.ApiError> {
	errorMessage: string;
}

export interface IRidesClearStoreAction extends Action<GenericActionTypes.ClearStore> {

}
//#endregion

//#region RIDE REQUESTS
/** Action for getting ride reqs */
export interface IGetRideRequestsAction extends Action<RideRequestsActionTypes.GetRideRequests> {
}

/** Action for getting ride reqs success */
export interface IGetRideRequestsSuccessAction extends Action<RideRequestsActionTypes.GetRideRequestsSuccess> {
	requestsOwner: IRideRequest[];
	requestsParticipant: IRideRequest[];
}

/** Action for getting ride reqs error */
export interface IGetRideRequestsErrorAction extends Action<RideRequestsActionTypes.GetRideRequestsError> {
	error: Error;
}

/** Action for answering ride req */
export interface IAnswerRideRequestAction extends Action<RideRequestsActionTypes.AnswerRideRequest> {
	id: string;
	isAccepted: boolean;
	owned: boolean;
}

/** Action for answering ride req success */
export interface IAnswerRideRequestSuccessAction extends Action<RideRequestsActionTypes.AnswerRideRequestSuccess> {
}

/** Action for answering ride req error */
export interface IAnswerRideRequestErrorAction extends Action<RideRequestsActionTypes.AnswerRideRequestError> {
	error: Error;
}
//#endregion

//#region RIDES
export interface ILeaveRideAction extends Action<RideActionTypes.LeaveRide> {
	rideId: string;
}

export interface ILeaveRideSuccessAction extends Action<RideActionTypes.LeaveRideSuccess> {
}

export interface ILeaveRideErrorAction extends Action<RideActionTypes.LeaveRideError> {
	error: Error;
}

export interface IDeleteRideAction extends Action<RideActionTypes.DeleteRide> {
	rideId: string;
	recurring?: boolean;
}

export interface IDeleteRideSuccessAction extends Action<RideActionTypes.DeleteRideSuccess> {
}

export interface IDeleteRideErrorAction extends Action<RideActionTypes.DeleteRideError> {
	error: Error;
}

export interface IDeletePassengerAction extends Action<RideActionTypes.DeletePassenger> {
	rideId: string;
	userId: string;
}

export interface IDeletePassengerSuccessAction extends Action<RideActionTypes.DeletePassengerSuccess> {
}

export interface IDeletePassengerErrorAction extends Action<RideActionTypes.DeletePassengerError> {
	error: Error;
}
//#endregion

export type GenericAction =
	IApiErrorAction
	| IRidesClearStoreAction;

/** Type of ride req action */
export type RideRequestsAction =
	IGetRideRequestsAction
	| IGetRideRequestsSuccessAction
	| IGetRideRequestsErrorAction
	| IAnswerRideRequestAction
	| IAnswerRideRequestSuccessAction
	| IAnswerRideRequestErrorAction;

export type RideAction =
	ILeaveRideAction
	| ILeaveRideErrorAction
	| ILeaveRideSuccessAction
	| IDeleteRideAction
	| IDeleteRideErrorAction
	| IDeleteRideSuccessAction
	| IDeletePassengerAction
	| IDeletePassengerErrorAction
	| IDeletePassengerSuccessAction;

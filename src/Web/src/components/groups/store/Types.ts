import { Action } from "redux";
import { IAddRideInput } from "../../rides/addRide/interfaces/IAddRideInput";
import { IGroup } from "../interfaces/IGroup";
import { IInvite } from "../interfaces/IInvite";
import { IRide } from "../interfaces/IRide";

export enum GenericActionTypes {
	ApiError = "GROUPS_STORE_API_ERROR"
}

/** Enum of groups actions */
export enum GroupsActionTypes {
	AddGroup = "GROUPS_ADD_GROUP",
	AddGroupSuccess = "GROUPS_ADD_GROUP_SUCCESS",
	AddGroupError = "GROUPS_ADD_GROUP_ERROR",
	GetGroups = "GROUPS_GET_GROUPS",
	GetGroupsSuccess = "GROUPS_GET_GROUPS_SUCCESS",
	GetGroupsError = "GROUPS_GET_GROUPS_ERROR",
}

/** Enum of invites actions */
export enum InvitesActionTypes {
	AnswerInvite = "INVITES_ANSWER_INVITE",
	AnswerInviteSuccess = "INVITES_ANSWER_INVITE_SUCCESS",
	AnswerInviteError = "INVITES_ANSWER_INVITE_ERROR",
	GetInvites = "INVITES_GET_INVITES",
	GetInvitesSuccess = "INVITES_GET_INVITES_SUCCESS",
	GetInvitesError = "INVITES_GET_INVITES_ERROR",
	AddInvites = "INVITES_ADD",
}

/** Enum of rides actions */
export enum RidesActionTypes {
	GetRides = "RIDES_GET_RIDES",
	GetRidesSuccess = "RIDES_GET_RIDES_SUCCESS",
	GetRidesError = "RIDES_GET_RIDES_ERROR",
	ParticipateInRide = "RIDES_PARTICIPATE_IN_RIDE",
	ParticipateInRideSuccess = "RIDES_PARTICIPATE_IN_RIDE_SUCCESS",
	ParticipateInRideError = "RIDES_PARTICIPATE_IN_RIDE_ERROR",
	AddRide = "RIDES_ADD",
}

//#region GENERIC
export interface IApiErrorAction extends Action<GenericActionTypes.ApiError> {
	errorMessage: string;
}
//#endregion

//#region GROUPS
/** Action for adding group */
export interface IAddGroupAction extends Action<GroupsActionTypes.AddGroup> {
	group: IGroup;
}

/** Action for adding group success */
export interface IAddGroupActionSuccess
	extends Action<GroupsActionTypes.AddGroupSuccess> {
	newGroup: IGroup;
}

/** Action for adding group error */
export interface IAddGroupActionError
	extends Action<GroupsActionTypes.AddGroupError> {
	error: Error;
}

/** Action for getting groups */
export interface IGetGroupsAction extends Action<GroupsActionTypes.GetGroups> {
	userOnly: boolean;
	count?: number;
	page?: number;
}

/** Action for getting groups success */
export interface IGetGroupsActionSuccess
	extends Action<GroupsActionTypes.GetGroupsSuccess> {
	groups: IGroup[];
}

/** Action for getting groups error */
export interface IGetGroupsActionError
	extends Action<GroupsActionTypes.GetGroupsError> {
	error: Error;
}
//#endregion

//#region INVITES
/** Action for answering invitation */
export interface IAnswerInviteAction extends Action<InvitesActionTypes.AnswerInvite> {
	accepted: boolean;
	inviteId: string;
}

/** Action for answering invitation success */
export interface IAnswerInviteActionSuccess extends Action<InvitesActionTypes.AnswerInviteSuccess> {
	inviteId: string;
}

/** Action for answering invitation error */
export interface IAnswerInviteActionError extends Action<InvitesActionTypes.AnswerInviteError> {
	error: Error;
}

/** Action for getting invites */
export interface IGetInvitesAction
	extends Action<InvitesActionTypes.GetInvites> {
	userOnly: boolean;
}

/** Action for getting invites success */
export interface IGetInvitessActionSuccess
	extends Action<InvitesActionTypes.GetInvitesSuccess> {
	invites: IInvite[];
}

/** Action for getting invites error */
export interface IGetInvitesActionError
	extends Action<InvitesActionTypes.GetInvitesError> {
	error: Error;
}

export interface IAddInvitesAction extends Action<InvitesActionTypes.AddInvites> {
	groupId: string;
	userIds: string[];
}
//#endregion

//#region RIDES
/** Action for getting rides */
export interface IGetRidesAction extends Action<RidesActionTypes.GetRides> {
}

/** Action for getting rides success */
export interface IGetRidesActionSuccess extends Action<RidesActionTypes.GetRidesSuccess> {
	ridesOwned: IRide[];
	ridesParticipated: IRide[];
	ridesOwnedPast: IRide[];
	ridesParticipatedPast: IRide[];
}

/** Action for getting rides error */
export interface IGetRidesActionError extends Action<RidesActionTypes.GetRidesError> {
	error: Error;
}

/** Action for participating in ride */
export interface IParticipateInRideAction extends Action<RidesActionTypes.ParticipateInRide> {
	rideId: string;
}

/** Action for participating in ride success */
export interface IParticipateInRideActionSuccess extends Action<RidesActionTypes.ParticipateInRideSuccess> {
	rideId: string;
}

/** Action for participating in ride error */
export interface IParticipateInRideActionError extends Action<RidesActionTypes.ParticipateInRideError> {
	error: Error;
}

export interface IAddRideAction extends Action<RidesActionTypes.AddRide> {
	input: IAddRideInput;
}
//#endregion

export type GenericAction =
	IApiErrorAction;

/** Type of group action */
export type GroupsAction =
	IAddGroupAction
	| IAddGroupActionSuccess
	| IAddGroupActionError
	| IGetGroupsAction
	| IGetGroupsActionSuccess
	| IGetGroupsActionError;

export type InviteAction =
	IAnswerInviteAction
	| IAnswerInviteActionSuccess
	| IAnswerInviteActionError
	| IGetInvitesAction
	| IGetInvitessActionSuccess
	| IGetInvitesActionError
	| IAddInvitesAction;

export type RideAction =
	IGetRidesAction
	| IGetRidesActionSuccess
	| IGetRidesActionError
	| IParticipateInRideAction
	| IParticipateInRideActionSuccess
	| IParticipateInRideActionError
	| IAddRideAction;

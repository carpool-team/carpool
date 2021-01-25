import { Action } from "redux";
import { IAddRideInput } from "../../rides/components/addRide/interfaces/IAddRideInput";
import { LoadingStatus } from "../../shared/enum/LoadingStatus";
import { RideDirection } from "../api/addRide/AddRideRequest";
import { IEditGroupFormData } from "../components/edit/interfaces/IEditGroupFormData";
import { IAddGroupData } from "../interfaces/IAddGroupData";
import { IGroup } from "../interfaces/IGroup";
import { IGroupUser } from "../interfaces/IGroupUser";
import { IInvite } from "../interfaces/IInvite";
import { ILocation } from "../interfaces/ILocation";
import { IReport } from "../interfaces/IReport";
import { IRide } from "../interfaces/IRide";
import { IRideFilters } from "../interfaces/IRideFilters";

export enum GenericActionTypes {
	ApiError = "GROUPS_STORE_API_ERROR",
	ClearStore = "GROUPS_STORE_CLEAR",
	SetLoadingStatus = "GROUPS_STORE_SET_LOADING_STATUS",
}

/** Enum of groups actions */
export enum GroupsActionTypes {
	AddGroup = "GROUPS_ADD_GROUP",
	AddGroupSuccess = "GROUPS_ADD_GROUP_SUCCESS",
	AddGroupError = "GROUPS_ADD_GROUP_ERROR",
	GetGroups = "GROUPS_GET_GROUPS",
	GetGroupsSuccess = "GROUPS_GET_GROUPS_SUCCESS",
	GetGroupsError = "GROUPS_GET_GROUPS_ERROR",
	GetGroupUsers = "GROUPS_GET_GROUP_USERS",
	GetGroupUsersSuccess = "GROUPS_GET_GROUP_USERS_SUCCESS",
	GetGroupUsersError = "GROUPS_GET_GROUP_USERS_ERROR",
	SetSelectedGroup = "GROUPS_SET_SELECTED_GROUP",
	UpdateGroupDetails = "GROUPS_UPDATE_GROUP_DETAILS",
	GetSelectedGroupDetailsSuccess = "GROUPS_GET_SELECTED_GROUP_DETAILS_SUCCESS",
	GetSelectedGroupDetailsError = "GROUPS_GET_SELECTED_GROUP_DETAILS_ERROR",
	LeaveGroup = "GROUPS_LEAVE_GROUP",
	LeaveGroupSuccess = "GROUPS_LEAVE_GROUP_SUCCESS",
	LeaveGroupError = "GROUPS_LEAVE_GROUP_ERROR",
	DeleteUserFromGroup = "GROUPS_DELETE_USER_FROM_GROUP",
	DeleteUserFromGroupSuccess = "GROUPS_DELETE_USER_FROM_GROUP_SUCCESS",
	DeleteUserFromGroupError = "GROUPS_DELETE_USER_FROM_GROUP_ERROR",
	DeleteGroup = "GROUPS_DELETE_GROUP",
	DeleteGroupSuccess = "GROUPS_DELETE_GROUP_SUCCESS",
	DeleteGroupError = "GROUPS_DELETE_GROUP_ERROR",
	EditGroup = "GROUPS_EDIT_GROUP",
	EditGroupSuccess = "GROUPS_EDIT_GROUP_SUCCESS",
	EditGroupError = "GROUPS_EDIT_GROUP_ERROR",
	GetReport = "GROUPS_GET_REPORT",
	GetReportSuccess = "GROUPS_GET_REPORT_SUCCESS",
	GetReportError = "GROUPS_GET_REPORT_ERROR",
	ClearReport = "GROUPS_CLEAR_REPORT",
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
	GetRidesAvailable = "RIDES_GET_RIDES_AVAILABLE",
	GetRidesAvailableSuccess = "RIDES_GET_RIDES_AVAILABLE_SUCCESS",
	GetRidesAvailableError = "RIDES_GET_RIDES_AVAILABLE_ERROR",
	ParticipateInRide = "RIDES_PARTICIPATE_IN_RIDE",
	ParticipateInRideSuccess = "RIDES_PARTICIPATE_IN_RIDE_SUCCESS",
	ParticipateInRideError = "RIDES_PARTICIPATE_IN_RIDE_ERROR",
	AddRide = "RIDES_ADD",
	AddRideError = "RIDES_ADD_ERROR",
	AddRideSuccess = "RIDES_ADD_SUCCESS",
}

//#region GENERIC
export interface IApiErrorAction extends Action<GenericActionTypes.ApiError> {
	errorMessage: string;
}

export interface IGroupsClearStoreAction extends Action<GenericActionTypes.ClearStore> {
}

export interface ISetLoadingStatusAction extends Action<GenericActionTypes.SetLoadingStatus> {
	status: LoadingStatus;
}
//#endregion

//#region GROUPS
/** Action for adding group */
export interface IAddGroupAction extends Action<GroupsActionTypes.AddGroup> {
	group: IAddGroupData;
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

/** Action for getting group report */
export interface IGetReportAction extends Action<GroupsActionTypes.GetReport> {
	groupId: string;
	startDate: Date;
	endDate: Date;
}

/** Action for getting group report success */
export interface IGetReportActionSuccess
	extends Action<GroupsActionTypes.GetReportSuccess> {
	report: IReport;
}

/** Action for getting group report error */
export interface IGetReportActionError
	extends Action<GroupsActionTypes.GetReportError> {
	error: Error;
}

export interface IClearReportAction extends Action<GroupsActionTypes.ClearReport> {
}

/** Action for getting group users */
export interface IGetGroupUsersAction extends Action<GroupsActionTypes.GetGroupUsers> {
	groupId: string;
}

/** Action for getting group users success */
export interface IGetGroupUsersSuccessAction extends Action<GroupsActionTypes.GetGroupUsersSuccess> {
	groupId: string;
	users: IGroupUser[];
}

/** Action for getting group users error */
export interface IGetGroupUsersErrorAction extends Action<GroupsActionTypes.GetGroupUsersError> {
	error: Error;
}

export interface ISetSelectedGroupAction extends Action<GroupsActionTypes.SetSelectedGroup> {
	group: IGroup;
}

export interface IUpdateGroupDetailsAction extends Action<GroupsActionTypes.UpdateGroupDetails> {
	groupId: string;
}

export interface IGetSelectedGroupDetailsSuccessAction extends Action<GroupsActionTypes.GetSelectedGroupDetailsSuccess> {
	group: IGroup;
}

export interface IGetSelectedGroupDetailsErrorAction extends Action<GroupsActionTypes.GetSelectedGroupDetailsError> {
	error: Error;
}

export interface ILeaveGroupAction extends Action<GroupsActionTypes.LeaveGroup> {
	groupId: string;
}

export interface ILeaveGroupSuccessAction extends Action<GroupsActionTypes.LeaveGroupSuccess> {
}

export interface ILeaveGroupErrorAction extends Action<GroupsActionTypes.LeaveGroupError> {
	error: Error;
}

export interface IDeleteUserFromGroupAction extends Action<GroupsActionTypes.DeleteUserFromGroup> {
	groupId: string;
	userId: string;
}

export interface IDeleteUserFromGroupSuccessAction extends Action<GroupsActionTypes.DeleteUserFromGroupSuccess> {
}

export interface IDeleteUserFromGroupErrorAction extends Action<GroupsActionTypes.DeleteUserFromGroupError> {
	error: Error;
}

export interface IDeleteGroupAction extends Action<GroupsActionTypes.DeleteGroup> {
	groupId: string;
}

export interface IDeleteGroupSuccessAction extends Action<GroupsActionTypes.DeleteGroupSuccess> {
}

export interface IDeleteGroupErrorAction extends Action<GroupsActionTypes.DeleteGroupError> {
	error: Error;
}

export interface IEditGroupAction extends Action<GroupsActionTypes.EditGroup> {
	data: IEditGroupFormData;
	groupId: string;
}

export interface IEditGroupSuccessAction extends Action<GroupsActionTypes.EditGroupSuccess> {
}

export interface IEditGroupErrorAction extends Action<GroupsActionTypes.EditGroupError> {
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
	refreshRidesAvailable?: boolean;
	groupId?: string;
	filters?: IRideFilters;
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

/** Action for getting available rides success */
export interface IGetRidesAvailableAction extends Action<RidesActionTypes.GetRidesAvailable> {
	groupId: string;
	filters?: IRideFilters;
}

/** Action for getting available rides success */
export interface IGetRidesAvailableActionSuccess extends Action<RidesActionTypes.GetRidesAvailableSuccess> {
	rides: IRide[];
}

/** Action for getting available rides error */
export interface IGetRidesAvailableActionError extends Action<RidesActionTypes.GetRidesAvailableError> {
	error: Error;
}

/** Action for participating in ride */
export interface IParticipateInRideAction extends Action<RidesActionTypes.ParticipateInRide> {
	ride: IRide;
	location: ILocation;
	filters?: IRideFilters;
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

export interface IAddRideErrorAction extends Action<RidesActionTypes.AddRideError> {
	error: Error;
}

export interface IAddRideSuccessAction extends Action<RidesActionTypes.AddRideSuccess> {
}
//#endregion

export type GenericAction =
	IApiErrorAction
	| IGroupsClearStoreAction
	| ISetLoadingStatusAction;

/** Type of group action */
export type GroupsAction =
	IAddGroupAction
	| IAddGroupActionSuccess
	| IAddGroupActionError
	| IGetGroupsAction
	| IGetGroupsActionSuccess
	| IGetGroupsActionError
	| IGetGroupUsersAction
	| IGetGroupUsersSuccessAction
	| IGetGroupUsersErrorAction
	| ISetSelectedGroupAction
	| IUpdateGroupDetailsAction
	| IGetSelectedGroupDetailsSuccessAction
	| IGetSelectedGroupDetailsErrorAction
	| ILeaveGroupAction
	| ILeaveGroupErrorAction
	| ILeaveGroupSuccessAction
	| IDeleteUserFromGroupAction
	| IDeleteUserFromGroupErrorAction
	| IDeleteUserFromGroupSuccessAction
	| IDeleteGroupAction
	| IDeleteGroupErrorAction
	| IDeleteGroupSuccessAction
	| IEditGroupAction
	| IEditGroupSuccessAction
	| IEditGroupErrorAction
	| IGetReportAction
	| IGetReportActionSuccess
	| IGetReportActionError
	| IClearReportAction;

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
	| IGetRidesAvailableAction
	| IGetRidesAvailableActionSuccess
	| IGetRidesAvailableActionError
	| IParticipateInRideAction
	| IParticipateInRideActionSuccess
	| IParticipateInRideActionError
	| IAddRideAction
	| IAddRideErrorAction
	| IAddRideSuccessAction;

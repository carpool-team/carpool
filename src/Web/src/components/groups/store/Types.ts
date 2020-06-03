import { Action } from "redux";
import { IGroup } from "../interfaces/IGroup";
import { IInvite } from "../interfaces/IInvite";

/** Enum of groups actions */
export enum GroupsActionTypes {
	AddGroup = "GROUPS_ADD_GROUP",
	AddGroupSuccess = "GROUPS_ADD_GROUP_SUCCESS",
	AddGroupError = "GROUPS_ADD_GROUP_ERROR",
	GetGroups = "GROUPS_GET_GROUPS",
	GetGroupsSuccess = "GROUPS_GET_GROUPS_SUCCESS",
	GetGroupsError = "GROUPS_GET_GROUPS_ERROR",
}
export enum InvitesActionTypes {
	AnswerInvite = "INVITES_ANSWER_INVITE",
	AnswerInviteSuccess = "INVITES_ANSWER_INVITE_SUCCESS",
	AnswerInviteError = "INVITES_ANSWER_INVITE_ERROR",
	GetInvites = "INVITES_GET_INVITES",
	GetInvitesSuccess = "INVITES_GET_INVITES_SUCCESS",
	GetInvitesError = "INVITES_GET_INVITES_ERROR",
}

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

/** Type of group action */
export type GroupsAction =
	| IAddGroupAction
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
	| IGetInvitesActionError;

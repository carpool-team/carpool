import { Action } from "redux";
import { IGroup } from "../interfaces/IGroup";

/** Enum of groups actions */
export enum GroupsActionTypes {
	AddGroup = "GROUPS_ADD_GROUP",
	AddGroupSuccess = "GROUPS_ADD_GROUP_SUCCESS",
	AddGroupError = "GROUPS_ADD_GROUP_ERROR",
	GetGroups = "GROUPS_GET_GROUPS",
	GetGroupsSuccess = "GROUPS_GET_GROUPS_SUCCESS",
	GetGroupsError = "GROUPS_GET_GROUPS_ERROR",
}

/** Action for adding group */
export interface IAddGroupAction extends Action<GroupsActionTypes.AddGroup> {
	group: IGroup;
}

/** Action for adding group success */
export interface IAddGroupActionSuccess extends Action<GroupsActionTypes.AddGroupSuccess> {
	newGroup: IGroup;
}

/** Action for adding group error */
export interface IAddGroupActionError extends Action<GroupsActionTypes.AddGroupError> {
	error: Error;
}

/** Action for getting groups */
export interface IGetGroupsAction extends Action<GroupsActionTypes.GetGroups> {
	userOnly: boolean;
}

/** Action for getting groups success */
export interface IGetGroupsActionSuccess extends Action<GroupsActionTypes.GetGroupsSuccess> {
	groups: IGroup[];
}

/** Action for getting groups error */
export interface IGetGroupsActionError extends Action<GroupsActionTypes.GetGroupsError> {
	error: Error;
}

/** Type of group action */
export type GroupsAction =
	IAddGroupAction |
	IAddGroupActionSuccess |
	IAddGroupActionError |
	IGetGroupsAction |
	IGetGroupsActionSuccess |
	IGetGroupsActionError;
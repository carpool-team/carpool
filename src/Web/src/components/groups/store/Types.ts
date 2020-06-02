import { Action } from "redux";
import { IGroup } from "../interfaces/IGroup";

/** Enum of groups actions */
export enum GroupsActionTypes {
	AddGroup = "GROUPS_ADD_GROUP",
	AddGroupSuccess = "GROUPS_ADD_GROUP_SUCCESS",
	AddGroupError = "GROUPS_ADD_GROUP_ERROR",
}

/** Action for adding group */
export interface IAddGroupAction extends Action<GroupsActionTypes.AddGroup> {
	group: IGroup;
}

/** Action for adding group success */
export interface IAddGroupActionSuccess extends Action<GroupsActionTypes.AddGroupSuccess> { }

/** Action for adding group error */
export interface IAddGroupActionError extends Action<GroupsActionTypes.AddGroupError> { }

/** Type of group action */
export type GroupsAction =
	IAddGroupAction |
	IAddGroupActionSuccess |
	IAddGroupActionError;
import { Action, AnyAction } from "redux";
import { IGroup } from "../interfaces/IGroup";

/** Enum of groups actions */
export enum GroupsActionTypes {
	AddGroup = "GROUPS_ADD_GROUP",
}

/** Action for adding group */
export interface IAddGroupAction extends Action<GroupsActionTypes.AddGroup> {
	group: IGroup;
}

/** Type of group action */
export type GroupsAction =
	IAddGroupAction |
	AnyAction; // temporary until more actions are added to type
import {
	IAddGroupAction,
	GroupsActionTypes,
	IAddGroupActionError
} from "./Types";
import { IGroup } from "../interfaces/IGroup";

export function addGroup(group: IGroup): IAddGroupAction {
	return {
		type: GroupsActionTypes.AddGroup,
		group,
	};
}

export function AddGroupError(): IAddGroupActionError {
	return {
		type: GroupsActionTypes.AddGroupError,
	};
}
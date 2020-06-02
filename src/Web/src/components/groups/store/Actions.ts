import {
	GroupsActionTypes,
	IAddGroupAction,
	IAddGroupActionError,
	IAddGroupActionSuccess
} from "./Types";
import { IGroup } from "../interfaces/IGroup";

export function addGroup(group: IGroup): IAddGroupAction {
	return {
		type: GroupsActionTypes.AddGroup,
		group,
	};
}

export function addGroupSuccess(): IAddGroupActionSuccess {
	return {
		type: GroupsActionTypes.AddGroupSuccess,
	};
}

export function addGroupError(error: Error): IAddGroupActionError {
	return {
		type: GroupsActionTypes.AddGroupError,
		error,
	};
}
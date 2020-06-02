import {
	GroupsActionTypes,
	IAddGroupAction,
	IAddGroupActionError,
	IAddGroupActionSuccess,
	IGetGroupsActionSuccess,
	IGetGroupsAction,
	IGetGroupsActionError
} from "./Types";
import { IGroup } from "../interfaces/IGroup";

export function addGroup(group: IGroup): IAddGroupAction {
	return {
		type: GroupsActionTypes.AddGroup,
		group,
	};
}

export function addGroupSuccess(newGroup: IGroup): IAddGroupActionSuccess {
	return {
		type: GroupsActionTypes.AddGroupSuccess,
		newGroup
	};
}

export function addGroupError(error: Error): IAddGroupActionError {
	return {
		type: GroupsActionTypes.AddGroupError,
		error,
	};
}

export function getGroups(userOnly: boolean): IGetGroupsAction {
	return {
		type: GroupsActionTypes.GetGroups,
		userOnly,
	};
}

export function getGroupsSuccess(groups: IGroup[]): IGetGroupsActionSuccess {
	return {
		type: GroupsActionTypes.GetGroupsSuccess,
		groups
	};
}

export function getGroupsError(error: Error): IGetGroupsActionError {
	return {
		type: GroupsActionTypes.GetGroupsError,
		error,
	};
}
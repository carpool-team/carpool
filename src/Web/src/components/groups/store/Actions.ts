import {
	GroupsActionTypes,
	IAddGroupAction,
	IGetGroupsAction,
	InvitesActionTypes,
	IGetInvitesAction,
	IAnswerInviteAction,
	IGetRidesAction,
	IGetRidesAvailableAction,
	IGetRidesAvailableActionSuccess,
	IGetRidesAvailableActionError,
	RidesActionTypes,
	IParticipateInRideAction,
	IAddRideAction,
	IAddInvitesAction,
	IGetGroupUsersAction,
	ISetSelectedGroupAction,
	ILeaveGroupAction,
	IDeleteUserFromGroupAction,
	IDeleteGroupAction,
	IEditGroupAction,
} from "./Types";
import { IRide } from "../interfaces/IRide";
import { IAddRideInput } from "../../rides/components/addRide/interfaces/IAddRideInput";
import { ILocation } from "../interfaces/ILocation";
import { IAddGroupData } from "../interfaces/IAddGroupData";
import { IGroup } from "../interfaces/IGroup";
import { IEditGroupFormData } from "../components/edit/interfaces/IEditGroupFormData";

//#region GROUPS
export function addGroup(group: IAddGroupData): IAddGroupAction {
	return {
		type: GroupsActionTypes.AddGroup,
		group,
	};
}

export function getGroups(count?: number, page?: number): IGetGroupsAction {
	return {
		type: GroupsActionTypes.GetGroups,
		count,
		page,
	};
}

export const getGroupUsers: (groupId: string) => IGetGroupUsersAction = groupId => ({
	type: GroupsActionTypes.GetGroupUsers,
	groupId,
});

export const setSelectedGroup: (group: IGroup) => ISetSelectedGroupAction = group => ({
	type: GroupsActionTypes.SetSelectedGroup,
	group,
});

export const leaveGroup: (groupId: string) => ILeaveGroupAction = groupId => ({
	type: GroupsActionTypes.LeaveGroup,
	groupId
});

export const deleteUserFromGroup: (groupId: string, userId: string) => IDeleteUserFromGroupAction = (groupId, userId) => ({
	type: GroupsActionTypes.DeleteUserFromGroup,
	groupId,
	userId
});

export const deleteGroup: (groupId: string) => IDeleteGroupAction = groupId => ({
	type: GroupsActionTypes.DeleteGroup,
	groupId,
});

export const editGroup: (data: IEditGroupFormData, groupId: string) => IEditGroupAction = (data, groupId) => ({
	type: GroupsActionTypes.EditGroup,
	data,
	groupId,
});
//#endregion

//#region INVITES
export function answerInvite(accepted: boolean, inviteId: string): IAnswerInviteAction {
	return {
		type: InvitesActionTypes.AnswerInvite,
		accepted,
		inviteId
	};
}

export function getInvites(userOnly: boolean): IGetInvitesAction {
	return {
		type: InvitesActionTypes.GetInvites,
		userOnly,
	};
}

export function addInvites(groupId: string, userIds: string[]): IAddInvitesAction {
	return {
		type: InvitesActionTypes.AddInvites,
		groupId,
		userIds,
	};
}
//#endregion

//#region RIDES
export function getRides(): IGetRidesAction {
	return {
		type: RidesActionTypes.GetRides,
	};
}

export function getRidesAvailable(groupId: string): IGetRidesAvailableAction {
	return {
		type: RidesActionTypes.GetRidesAvailable,
		groupId,
	};
}

export function getRidesAvailableSuccess(rides: IRide[]): IGetRidesAvailableActionSuccess {
	return {
		type: RidesActionTypes.GetRidesAvailableSuccess,
		rides
	};
}

export function getRidesAvailableError(error: Error): IGetRidesAvailableActionError {
	return {
		type: RidesActionTypes.GetRidesAvailableError,
		error,
	};
}

export function participateInRide(ride: IRide, location: ILocation): IParticipateInRideAction {
	return {
		type: RidesActionTypes.ParticipateInRide,
		ride,
		location,
	};
}

export function addRide(input: IAddRideInput): IAddRideAction {
	return {
		type: RidesActionTypes.AddRide,
		input,
	};
}
//#endregion

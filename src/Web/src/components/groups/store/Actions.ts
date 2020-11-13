import {
	GroupsActionTypes,
	IAddGroupAction,
	IAddGroupActionError,
	IAddGroupActionSuccess,
	IGetGroupsActionSuccess,
	IGetGroupsAction,
	IGetGroupsActionError,
	InvitesActionTypes,
	IGetInvitesAction,
	IGetInvitessActionSuccess,
	IGetInvitesActionError,
	IAnswerInviteActionError,
	IAnswerInviteActionSuccess,
	IAnswerInviteAction,
	IGetRidesAction,
	IGetRidesActionSuccess,
	IGetRidesActionError,
	RidesActionTypes,
	IParticipateInRideAction,
	ISetGroupSelectedAction,
	IParticipateInRideActionSuccess,
} from "./Types";
import { IGroup } from "../interfaces/IGroup";
import { IInvite } from "../interfaces/IInvite";
import { IRide } from "../interfaces/IRide";

//#region GROUPS
export function addGroup(group: IGroup): IAddGroupAction {
	return {
		type: GroupsActionTypes.AddGroup,
		group,
	};
}

export function addGroupSuccess(newGroup: IGroup): IAddGroupActionSuccess {
	return {
		type: GroupsActionTypes.AddGroupSuccess,
		newGroup,
	};
}

export function addGroupError(error: Error): IAddGroupActionError {
	return {
		type: GroupsActionTypes.AddGroupError,
		error,
	};
}

export function getGroups(userOnly: boolean, count?: number, page?: number): IGetGroupsAction {
	return {
		type: GroupsActionTypes.GetGroups,
		userOnly,
		count,
		page
	};
}

export function getGroupsSuccess(groups: IGroup[]): IGetGroupsActionSuccess {
	return {
		type: GroupsActionTypes.GetGroupsSuccess,
		groups,
	};
}

export function getGroupsError(error: Error): IGetGroupsActionError {
	return {
		type: GroupsActionTypes.GetGroupsError,
		error,
	};
}

export function setGroupSelected(id: string): ISetGroupSelectedAction {
	return {
		type: GroupsActionTypes.SetGroupSelected,
		id,
	};
}
//#endregion

//#region INVITES
export function answerInvite(accepted: boolean, inviteId: string): IAnswerInviteAction {
	return {
		type: InvitesActionTypes.AnswerInvite,
		accepted,
		inviteId
	};
}

export function answerInviteSuccess(
	inviteId: string
): IAnswerInviteActionSuccess {
	return {
		type: InvitesActionTypes.AnswerInviteSuccess,
		inviteId,
	};
}

export function answerInviteError(error: Error): IAnswerInviteActionError {
	return {
		type: InvitesActionTypes.AnswerInviteError,
		error,
	};
}

export function getInvites(userOnly: boolean): IGetInvitesAction {
	return {
		type: InvitesActionTypes.GetInvites,
		userOnly,
	};
}

export function getInvitesSuccess(
	invites: IInvite[]
): IGetInvitessActionSuccess {
	return {
		type: InvitesActionTypes.GetInvitesSuccess,
		invites,
	};
}

export function getInvitesError(error: Error): IGetInvitesActionError {
	return {
		type: InvitesActionTypes.GetInvitesError,
		error,
	};
}
//#endregion

//#region RIDES
export function getRides(userOnly: boolean): IGetRidesAction {
	return {
		type: RidesActionTypes.GetRides,
		userOnly,
	};
}

export function getRidesSuccess(rides: IRide[]): IGetRidesActionSuccess {
	return {
		type: RidesActionTypes.GetRidesSuccess,
		rides,
	};
}

export function getRidesError(error: Error): IGetRidesActionError {
	return {
		type: RidesActionTypes.GetRidesError,
		error,
	};
}

export function participateInRide(rideId: string): IParticipateInRideAction {
	return {
		type: RidesActionTypes.ParticipateInRide,
		rideId,
	};
}

export function participateInRideSuccess(rideId: string): IParticipateInRideActionSuccess {
	return {
		type: RidesActionTypes.ParticipateInRideSuccess,
		rideId,
	};
}
//#endregion

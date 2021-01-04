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
} from "./Types";
import { IRide } from "../interfaces/IRide";
import { IAddRideInput } from "../../rides/components/addRide/interfaces/IAddRideInput";
import { IFormGroupData } from "../components/addGroupForm/interfaces/IFormGroupData";
import { ILocation } from "../interfaces/ILocation";

//#region GROUPS
export function addGroup(group: IFormGroupData): IAddGroupAction {
	return {
		type: GroupsActionTypes.AddGroup,
		group,
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

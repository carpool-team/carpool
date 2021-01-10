import { IGroupsState } from "./State";
import { Reducer } from "redux";
import { produce } from "immer";
import { GroupsAction, GroupsActionTypes, InviteAction, InvitesActionTypes, RideAction, RidesActionTypes } from "./Types";

const initialState: IGroupsState = {
	groups: [],
	invites: [],
	ridesOwned: [],
	ridesParticipated: [],
	ridesOwnedPast: [],
	ridesParticipatedPast: [],
	ridesAvailable: [],
};

/**
 * Reducer for groups
 * @param state - state of groups
 * @param action - action for reducer
 */
const reducer: Reducer<IGroupsState> = (
	state = initialState,
	action: GroupsAction | InviteAction | RideAction
) => {
	return produce<IGroupsState>(state, (draft) => {
		let idx: number;
		switch (action.type) {
			case GroupsActionTypes.AddGroupSuccess:
				draft.groups.push(action.newGroup);
				break;
			case GroupsActionTypes.GetGroupsSuccess:
				draft.groups = action.groups;
				break;
			case InvitesActionTypes.AnswerInviteSuccess:
				idx = draft.invites.findIndex(i => i.groupInviteId === action.inviteId);
				if (idx > -1) {
					draft.invites[idx].isPending = true;
				}
				break;
			case InvitesActionTypes.GetInvitesSuccess:
				draft.invites = action.invites;
				break;
			case RidesActionTypes.GetRidesSuccess:
				draft.ridesOwned = action.ridesOwned;
				draft.ridesParticipated = action.ridesParticipated;
				draft.ridesOwnedPast = action.ridesOwnedPast;
				draft.ridesParticipatedPast = action.ridesParticipatedPast;
				break;
			case RidesActionTypes.ParticipateInRideSuccess:
				// idx = draft.rides.findIndex(r => r.id === action.rideId);
				// if (idx > -1) {
				// 	draft.rides[idx].isUserParticipant = true;
				// }
				break;
			case RidesActionTypes.GetRidesAvailableSuccess:
				draft.ridesAvailable = action.rides;
				break;
			case GroupsActionTypes.GetGroupUsersSuccess:
				draft.groups.find(g => g.groupId === action.groupId).users = action.users;
				break;
			case GroupsActionTypes.SetSelectedGroup:
			case GroupsActionTypes.GetSelectedGroupDetailsSuccess:
				idx = draft.groups.findIndex(g => g.groupId === action.group.groupId);
				draft.groups[idx] = action.group;
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as groupsReducer };

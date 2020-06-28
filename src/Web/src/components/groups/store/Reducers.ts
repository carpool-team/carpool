import { IGroupsState } from "./State";
import { Reducer } from "redux";
import { produce } from "immer";
import { GroupsAction, GroupsActionTypes, InviteAction, InvitesActionTypes, RideAction, RidesActionTypes } from "./Types";
import { IGroup } from "../interfaces/IGroup";

const initialState: IGroupsState = {
	groups: [],
	invites: [],
	rides: [],
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
		switch (action.type) {
			case GroupsActionTypes.AddGroupSuccess:
				draft.groups.push(action.newGroup);
				break;
			case GroupsActionTypes.GetGroupsSuccess:
				draft.groups = action.groups;
				draft.groups.forEach(g => {
					if (!g.selected) {
						g.selected = false;
					}
				});
				break;
			case InvitesActionTypes.AnswerInviteSuccess:
				draft.invites[draft.invites.findIndex(i => i.id === action.inviteId)].isPending = false;
				break;
			case InvitesActionTypes.GetInvitesSuccess:
				draft.invites = action.invites;
				break;
			case RidesActionTypes.GetRidesSuccess:
				draft.rides = action.rides;
				break;
			case GroupsActionTypes.SetGroupSelected:
				console.log("ACTION: ", action);
				let idx: number = draft.groups.findIndex(g => g.id === action.id);
				if (idx > -1) {
					draft.groups[idx].selected = action.selected;
				}
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as groupsReducer };

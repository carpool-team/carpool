import { IGroupsState } from "./State";
import { Reducer } from "redux";
import { produce } from "immer";
import { GroupsAction, GroupsActionTypes, InviteAction, InvitesActionTypes } from "./Types";

const initialState: IGroupsState = {
	groups: [],
	invites: [],
};

/**
 * Reducer for groups
 * @param state - state of groups
 * @param action - action for reducer
 */
const reducer: Reducer<IGroupsState> = (
	state = initialState,
	action: GroupsAction | InviteAction
) => {
	return produce<IGroupsState>(state, (draft) => {
		switch (action.type) {
			case GroupsActionTypes.AddGroupSuccess:
				draft.groups.push(action.newGroup);
				break;
			case GroupsActionTypes.GetGroupsSuccess:
				draft.groups = action.groups;
				break;
			case InvitesActionTypes.GetInvitesSuccess:
				console.log("INVITES REDUCER: ", action.invites);
				draft.invites = action.invites;
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as groupsReducer };

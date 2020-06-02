import { IGroupsState } from "./State";
import { Reducer } from "redux";
import { produce } from "immer";
import { GroupsAction, GroupsActionTypes } from "./Types";

const initialState: IGroupsState = {
	groups: [],
};

/**
 * Reducer for groups
 * @param state - state of groups
 * @param action - action for reducer
 */
const reducer: Reducer<IGroupsState> = (
	state = initialState,
	action: GroupsAction
) => {
	return produce<IGroupsState>(state, (draft) => {
		switch (action.type) {
			case GroupsActionTypes.AddGroupSuccess:
				draft.groups.push(action.newGroup);
				break;
			case GroupsActionTypes.GetGroupsSuccess:
				console.log(action.groups);
				draft.groups = action.groups;
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as groupsReducer };

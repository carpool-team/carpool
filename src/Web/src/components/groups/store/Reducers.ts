import { IGroupsState } from "./State";
import { Reducer } from "redux";
import { produce } from "immer";
import { GroupsAction, GroupsActionTypes } from "./Types";

const initialState: IGroupsState = {
	groups: [
		{
			name: "Testowa grupa 1",
			users: []
		},
		{
			name: "Testowa grupa 2",
			users: []
		}
	],
};

/**
 * Reducer for groups
 * @param state - state of groups
 * @param action - action for reducer
 */
const reducer: Reducer<IGroupsState> = (state = initialState, action: GroupsAction) => {
	return produce<IGroupsState>(state, draft => {
		switch (action.type) {
			case GroupsActionTypes.AddGroup:
				draft.groups.push(action.group);
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as groupsReducer };
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
			default:
				break;
		}
		return;
	});
};

export { reducer as groupsReducer };

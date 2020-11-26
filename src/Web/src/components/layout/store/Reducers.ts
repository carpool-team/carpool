import { ILayoutState } from "./State";
import { Reducer } from "redux";
import { produce } from "immer";
import {
	LayoutAction,
	LayoutActionTypes,
} from "./Types";

const initialState: ILayoutState = {
	redirectTo: undefined,
};

/**
 * Reducer for groups
 * @param state - state of groups
 * @param action - action for reducer
 */
const reducer: Reducer<ILayoutState> = (
	state = initialState,
	action: LayoutAction
) => {
	return produce<ILayoutState>(state, (draft) => {
		switch (action.type) {
			case LayoutActionTypes.Redirect:
				draft.redirectTo = action.to;
				break;
			case LayoutActionTypes.Redirected:
				draft.redirectTo = undefined;
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as layoutReducer };

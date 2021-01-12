import { ILayoutState } from "./State";
import { Reducer } from "redux";
import { produce } from "immer";
import {
	LayoutAction,
	LayoutActionTypes,
} from "./Types";

const initialState: ILayoutState = {
	redirectTo: undefined,
	loaderVisible: false,
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
			case LayoutActionTypes.SetLoaderVisible:
				draft.loaderVisible = action.visible;
				break;
			case LayoutActionTypes.ClearStore:
				Object.keys(draft).forEach(key => {
					draft[key] = initialState[key];
				});
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as layoutReducer };

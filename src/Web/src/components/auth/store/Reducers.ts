import { IAuthState } from "./State";
import { Reducer } from "redux";
import { produce } from "immer";
import {
	LoginAction,
	LoginActionTypes,
	RegisterAction,
	RegisterActionTypes
} from "./Types";

const initialState: IAuthState = {
	tokenInfo: null,
	initializing: true,
};

/**
 * Reducer for groups
 * @param state - state of groups
 * @param action - action for reducer
 */
const reducer: Reducer<IAuthState> = (
	state = initialState,
	action: LoginAction | RegisterAction
) => {
	return produce<IAuthState>(state, (draft) => {
		switch (action.type) {
			case LoginActionTypes.LoginSuccess:
				draft.initializing = false;
				draft.tokenInfo = action.tokenInfo;
				break;
			case RegisterActionTypes.RegisterSuccess:
				break;
			case LoginActionTypes.NoToken:
				draft.initializing = false;
				break;
			case LoginActionTypes.ClearStore:
				draft.tokenInfo = null;
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as authReducer };

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
				draft.tokenInfo = action.tokenInfo;
				break;
			case RegisterActionTypes.RegisterSuccess:
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as authReducer };

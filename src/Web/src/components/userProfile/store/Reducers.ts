import { IUserProfileState } from "./State";
import { Reducer } from "redux";
import { produce } from "immer";
import { UserProfileAction, UserProfileActionTypes } from "./Types";

const initialState: IUserProfileState = {
	userData: {
		firstName: "",
		lastName: "",
		email: "",
	},
};

/**
 * Reducer for user profile
 * @param state - state of user profile
 * @param action - action for reducer
 */
const reducer: Reducer<IUserProfileState> = (
	state = initialState,
	action: UserProfileAction
) => {
	return produce<IUserProfileState>(state, (draft) => {
		switch (action.type) {
			case UserProfileActionTypes.GetDataSuccess:
				draft.userData = action.data;
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as userProfileReducer };

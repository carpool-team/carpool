import { IRidesState } from "./State";
import { Reducer } from "redux";
import { produce } from "immer";
import { RideRequestsActionTypes, RideRequestsAction } from "./Types";

const initialState: IRidesState = {
	requestsOwner: [],
	requestsParticipant: [],
};

/**
 * Reducer for rides
 * @param state - state of rides
 * @param action - action for reducer
 */
const reducer: Reducer<IRidesState> = (
	state = initialState,
	action: RideRequestsAction
) => {
	return produce<IRidesState>(state, (draft) => {
		switch (action.type) {
			case RideRequestsActionTypes.GetRideRequestsSuccess:
				draft.requestsOwner = action.requestsOwner;
				draft.requestsParticipant = action.requestsParticipant;
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as ridesReducer };

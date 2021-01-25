import { IRidesState } from "./State";
import { Reducer } from "redux";
import { produce } from "immer";
import { RideRequestsActionTypes, RideRequestsAction, GenericActionTypes, GenericAction } from "./Types";
import { LoadingStatus } from "../../shared/enum/LoadingStatus";

const initialState: IRidesState = {
	requestsOwner: [],
	requestsParticipant: [],
	loadingStatus: LoadingStatus.Loading,
};

/**
 * Reducer for rides
 * @param state - state of rides
 * @param action - action for reducer
 */
const reducer: Reducer<IRidesState> = (
	state = initialState,
	action: RideRequestsAction | GenericAction
) => {
	return produce<IRidesState>(state, (draft) => {
		switch (action.type) {
			case RideRequestsActionTypes.GetRideRequestsSuccess:
				draft.requestsOwner = action.requestsOwner;
				draft.requestsParticipant = action.requestsParticipant;
				break;
			case GenericActionTypes.ClearStore:
				Object.keys(draft).forEach(key => {
					draft[key] = initialState[key];
				});
				break;
			case GenericActionTypes.SetLoadingStatus:
				draft.loadingStatus = action.status;
				break;
			default:
				break;
		}
		return;
	});
};

export { reducer as ridesReducer };

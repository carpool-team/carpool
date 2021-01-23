import { Reducer, combineReducers } from "redux";
import { IEpicModule } from "redux-dynamic-modules-observable";
import { groupsReducer } from "../components/groups/store/Reducers";
import { IGroupsState } from "../components/groups/store/State";
import { groupEpics } from "../components/groups/store/Epics";
import { authReducer } from "../components/auth/store/Reducers";
import { IAuthState } from "../components/auth/store/State";
import { authEpics } from "../components/auth/store/Epics";
import { ILayoutState } from "../components/layout/store/State";
import { layoutReducer } from "../components/layout/store/Reducers";
import { userProfileReducer } from "../components/userProfile/store/Reducers";
import { IUserProfileState } from "../components/userProfile/store/State";
import { userProfileEpics } from "../components/userProfile/store/Epics";
import { ridesReducer } from "../components/rides/store/Reducers";
import { IRidesState } from "../components/rides/store/State";
import { rideEpics } from "../components/rides/store/Epics";

export type RootReducerType = {
	groups: Reducer<IGroupsState>,
	auth: Reducer<IAuthState>,
	layout: Reducer<ILayoutState>,
	userProfile: Reducer<IUserProfileState>,
	rides: Reducer<IRidesState>,
};

export const rootReducer: RootReducerType = {
	groups: groupsReducer,
	auth: authReducer,
	layout: layoutReducer,
	userProfile: userProfileReducer,
	rides: ridesReducer,
};

export function getMainReduxModule(): IEpicModule<any> {
	return {
		id: "main",
		reducerMap: rootReducer,
		epics: [
			...groupEpics,
			...authEpics,
			...userProfileEpics,
			...rideEpics
		]
	};
}

const combinedReducer: Reducer = combineReducers(rootReducer);

export type AppState = {
	groups: IGroupsState;
	auth: IAuthState;
	layout: ILayoutState;
	userProfile: IUserProfileState;
};

import { Reducer, combineReducers } from "redux";
import { IEpicModule } from "redux-dynamic-modules-observable";
import { groupsReducer } from "../components/groups/store/Reducers";
import { IGroupsState } from "../components/groups/store/State";
import { groupEpics } from "../components/groups/store/Epics";
import { authReducer } from "../components/auth/store/Reducers";
import { IAuthState } from "../components/auth/store/State";
import { authEpics } from "../components/auth/store/Epics";

export type RootReducerType = {
	groups: Reducer<IGroupsState>,
	auth: Reducer<IAuthState>
};

export const rootReducer: RootReducerType = {
	groups: groupsReducer,
	auth: authReducer,
};

export function getMainReduxModule(): IEpicModule<any> {
	return {
		id: "main",
		reducerMap: rootReducer,
		epics: [
			...groupEpics,
			...authEpics
		]
	};
}

const combinedReducer: Reducer = combineReducers(rootReducer);

export type AppState = ReturnType<typeof combinedReducer>;

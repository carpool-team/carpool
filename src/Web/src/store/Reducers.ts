import { Reducer, combineReducers } from "redux";
import { IEpicModule } from "redux-dynamic-modules-observable";
import { groupsReducer } from "../components/groups/store/Reducers";
import { IGroupsState } from "../components/groups/store/State";

export type RootReducerType = {
	groups: Reducer<IGroupsState>,
};

export const rootReducer: RootReducerType = {
	groups: groupsReducer,
}

export function getMainReduxModule(): IEpicModule<any> {
	return {
		id: "main",
		reducerMap: rootReducer,
		epics: []
	};
};

const combinedReducer: Reducer = combineReducers(rootReducer);

export type AppState = ReturnType<typeof combinedReducer>;
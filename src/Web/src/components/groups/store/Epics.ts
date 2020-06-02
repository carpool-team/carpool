import { Epic, ofType } from "redux-observable";
import { switchMap, catchError } from "rxjs/operators";
import { GroupsAction, GroupsActionTypes, IAddGroupAction } from "./Types";
import { IGroupsState } from "./State";

const addGroupEpic: Epic<GroupsAction, any, IGroupsState> = action$ => action$.pipe(
	ofType<IAddGroupAction>(GroupsActionTypes.AddGroup),
	switchMap(action => {

		return { type: GroupsActionTypes.AddGroupSuccess };
	}),
);

export const groupEpics = [
	addGroupEpic
];
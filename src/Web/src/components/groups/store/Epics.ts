import { Epic, ofType } from "redux-observable";
import { switchMap, catchError, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { GroupsAction, GroupsActionTypes, IAddGroupAction, IAddGroupActionSuccess } from "./Types";
import { apiRequest } from "../../../api/apiRequest";
import { RequestType } from "../../../api/enum/RequestType";
import { RequestEndpoint } from "../../../api/enum/RequestEndpoint";

const addGroupEpic: Epic<GroupsAction> = (action$, state$) => action$.pipe(
	ofType(GroupsActionTypes.AddGroup),
	switchMap(async (action: IAddGroupAction) => {
		console.log(action.group);
		const response = await apiRequest({
			method: RequestType.POST,
			endpoint: RequestEndpoint.POST_ADD_GROUP,
			body: {
				name: action.group.name,
				code: action.group.code,
			},
		});
	}),
	mergeMap(response => {
		return [
			<IAddGroupActionSuccess>{
				type: GroupsActionTypes.AddGroupSuccess,
			}
		];
	}),
	catchError((err: Error) => of(<any>{
		type: GroupsActionTypes.AddGroupError,
		error: err,
	}))
);

export const groupEpics = [
	addGroupEpic
];
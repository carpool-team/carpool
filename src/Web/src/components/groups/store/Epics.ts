import { Epic, ofType } from "redux-observable";
import { switchMap, catchError, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { GroupsAction, GroupsActionTypes, IAddGroupAction, IAddGroupActionSuccess, IGetGroupsAction, IGetGroupsActionSuccess } from "./Types";
import { apiRequest, IRequestProps } from "../../../api/apiRequest";
import { RequestType } from "../../../api/enum/RequestType";
import { RequestEndpoint } from "../../../api/enum/RequestEndpoint";
import _ from "lodash";

const tempUserId: string = "8151a9b2-52ee-4ce0-a2dd-08d7f7744d91"; // TODO: ZAORAĆ, NIE MAGIC STRING

const addGroupEpic: Epic<GroupsAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.AddGroup),
	switchMap(async (action: IAddGroupAction) => {
		const response = await apiRequest({
			method: RequestType.POST,
			endpoint: RequestEndpoint.POST_ADD_GROUP,
			body: {
				name: action.group.name,
				code: action.group.code,
				ownerId: tempUserId
			},
		});
		return response;
	}),
	mergeMap(response => {
		return [
			<IAddGroupActionSuccess>{
				type: GroupsActionTypes.AddGroupSuccess,
				newGroup: response,
			}
		];
	}),
	catchError((err: Error) => of(<any>{
		type: GroupsActionTypes.AddGroupError,
		error: err,
	}))
);

const getGroupsEpic: Epic<GroupsAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.GetGroups),
	switchMap(async (action: IGetGroupsAction) => {
		let requestBody: IRequestProps;
		if (action.userOnly) {
			requestBody = {
				method: RequestType.GET,
				endpoint: RequestEndpoint.GET_USER_GROUPS,
				userId: tempUserId
			};
		} else {
			requestBody = {
				method: RequestType.GET,
				endpoint: RequestEndpoint.GET_ALL_GROUPS
			};
		}
		const response = await apiRequest(requestBody);
		return response;
	}),
	mergeMap(response => {
		console.log(response);
		return [
			<IGetGroupsActionSuccess>{
				type: GroupsActionTypes.GetGroupsSuccess,
				groups: response,
			}
		];
	}),
	catchError((err: Error) => of(<any>{
		type: GroupsActionTypes.GetGroupsError,
		error: err,
	}))
);

export const groupEpics = [
	addGroupEpic,
	getGroupsEpic,
];
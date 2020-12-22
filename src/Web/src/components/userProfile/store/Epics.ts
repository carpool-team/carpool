import { Epic, ofType } from "redux-observable";
import { mergeMap, switchMap } from "rxjs/operators";
import { getId } from "../../../helpers/UniversalHelper";
import { IAuthState } from "../../auth/store/State";
import { ISetLoaderVisibleAction, LayoutAction, LayoutActionTypes } from "../../layout/store/Types";
import { GetDataRequest } from "../api/GetDataRequest";
import { GetDataResponse } from "../api/GetDataResponse";
import { IUserData } from "../interfaces/IUserData";
import { IUserProfileState } from "./State";
import { IGetDataErrorAction, IGetDataSuccessAction, UserProfileAction, UserProfileActionTypes } from "./Types";

const getDataEpic: Epic<UserProfileAction> = (action$, state$) => action$.pipe(
	ofType(UserProfileActionTypes.GetData),
	switchMap(async () => {
		const request: GetDataRequest = new GetDataRequest(getId());
		try {
			const response: GetDataResponse = await request.send();
			let data: IUserData = {
				firstName: response.result.firstName,
				lastName: response.result.lastName,
				email: response.result.email,
			};

			return <IGetDataSuccessAction>{
				type: UserProfileActionTypes.GetDataSuccess,
				data,
			};
		} catch {
			return <IGetDataErrorAction>{
				type: UserProfileActionTypes.GetDataError,
			};
		}
	})
);

const getDataSuccessEpic: Epic<UserProfileAction | LayoutAction> = (action$) => action$.pipe(
	ofType(UserProfileActionTypes.GetDataSuccess),
	switchMap(async (_action: IGetDataSuccessAction) => {
		return [
			<ISetLoaderVisibleAction>{
				type: LayoutActionTypes.SetLoaderVisible,
				visible: false,
			}
		];
	}),
	mergeMap(res => res)
);

export const userProfileEpics = [
	getDataEpic,
	getDataSuccessEpic,
];

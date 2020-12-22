import { Epic, ofType } from "redux-observable";
import { mergeMap, switchMap } from "rxjs/operators";
import { getId } from "../../../helpers/UniversalHelper";
import { IAuthState } from "../../auth/store/State";
import { ISetLoaderVisibleAction, LayoutAction, LayoutActionTypes } from "../../layout/store/Types";
import { GetDataRequest } from "../api/GetDataRequest";
import { GetDataResponse } from "../api/GetDataResponse";
import { UpdateDataRequest } from "../api/UpdateDataRequest";
import { UpdateDataResponse } from "../api/UpdateDataResponse";
import { IUserData } from "../interfaces/IUserData";
import { IUserProfileState } from "./State";
import { IGetDataAction, IGetDataErrorAction, IGetDataSuccessAction, IUpdateDataAction, IUpdateDataErrorAction, IUpdateDataSuccessAction, UserProfileAction, UserProfileActionTypes } from "./Types";

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
	mergeMap((_action: IGetDataSuccessAction) => [
		<ISetLoaderVisibleAction>{
			type: LayoutActionTypes.SetLoaderVisible,
			visible: false,
		}
	]),
);

const updateDataEpic: Epic<UserProfileAction> = (action$) => action$.pipe(
	ofType(UserProfileActionTypes.UpdateData),
	switchMap(async (action: IUpdateDataAction) => {
		const request: UpdateDataRequest = new UpdateDataRequest({
			appUserId: getId(),
			body: {
				...action.data,
			}
		});
		try {
			const response: UpdateDataResponse = await request.send();
			if (response.isError) {
				return <IUpdateDataErrorAction>{
					type: UserProfileActionTypes.UpdateDataError,
				};
			} else {
				return <IUpdateDataSuccessAction>{
					type: UserProfileActionTypes.UpdateDataSuccess,
				};
			}
		} catch {
			return <IUpdateDataErrorAction>{
				type: UserProfileActionTypes.UpdateDataError,
			};
		}
	}),
);

const updateDataSuccesEpic: Epic<UserProfileAction | LayoutAction> = (action$) => action$.pipe(
	ofType(UserProfileActionTypes.UpdateDataSuccess),
	mergeMap((_action: IUpdateDataSuccessAction) => [
		<IGetDataAction>{
			type: UserProfileActionTypes.GetData,
		},
		<ISetLoaderVisibleAction>{
			type: LayoutActionTypes.SetLoaderVisible,
			visible: true,
		}
	]),
);

export const userProfileEpics = [
	getDataEpic,
	getDataSuccessEpic,
	updateDataEpic,
	updateDataSuccesEpic,
];

import { Epic, ofType } from "redux-observable";
import { mergeMap, switchMap } from "rxjs/operators";
import { getId } from "../../../helpers/UniversalHelper";
import { ILogoutAction, LoginAction, LoginActionTypes } from "../../auth/store/Types";
import { ISetLoaderVisibleAction, LayoutAction, LayoutActionTypes } from "../../layout/store/Types";
import { DeleteUserRequest } from "../api/deleteUser/DeleteUserRequest";
import { GetDataRequest } from "../api/getData/GetDataRequest";
import { GetDataResponse } from "../api/getData/GetDataResponse";
import { UpdateDataRequest } from "../api/updateData/UpdateDataRequest";
import { UpdateDataResponse } from "../api/updateData/UpdateDataResponse";
import { IUserData } from "../interfaces/IUserData";
import {
	IDeleteUserAction,
	IDeleteUserErrorAction,
	IDeleteUserSuccessAction,
	IGetDataAction,
	IGetDataErrorAction,
	IGetDataSuccessAction,
	IUpdateDataAction,
	IUpdateDataErrorAction,
	IUpdateDataSuccessAction,
	UserProfileAction,
	UserProfileActionTypes
} from "./Types";

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
		} catch (err) {
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
		} catch (err) {
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

const deleteUserEpic: Epic<UserProfileAction | LoginAction> = (action$) => action$.pipe(
	ofType(UserProfileActionTypes.DeleteUser),
	switchMap(async (_action: IDeleteUserAction) => {
		const request = new DeleteUserRequest(getId());
		try {
			const response = await request.send();
			if (response.isError || response.status > 299) {
				return [
					<IDeleteUserErrorAction>{
						type: UserProfileActionTypes.DeleteUserError,
					}
				];
			} else {
				return [
					<IDeleteUserSuccessAction>{
						type: UserProfileActionTypes.DeleteUserSuccess,
					},
					<ILogoutAction>{
						type: LoginActionTypes.Logout,
					},
				];
			}
		} catch (err) {
			return [
				<IDeleteUserErrorAction>{
					type: UserProfileActionTypes.DeleteUserError,
					error: err,
				}
			];
		}
	}),
	mergeMap(res => res)
);

export const userProfileEpics = [
	getDataEpic,
	getDataSuccessEpic,
	updateDataEpic,
	updateDataSuccesEpic,
	deleteUserEpic,
];

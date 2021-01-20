import { toast } from "react-toastify";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import { getId } from "../../../helpers/UniversalHelper";
import i18n from "../../../i18n";
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
			if (response.isError || response.status >= 300) {
				toast.error(i18n.t("userProfile.getData.error"));
				return <IGetDataErrorAction>{
					type: UserProfileActionTypes.GetDataError,
				};
			} else {
				let data: IUserData = {
					firstName: response.result.firstName,
					lastName: response.result.lastName,
					email: response.result.email,
				};

				return <IGetDataSuccessAction>{
					type: UserProfileActionTypes.GetDataSuccess,
					data,
				};
			}
		} catch (err) {
			toast.error(i18n.t("userProfile.getData.error"));
			return <IGetDataErrorAction>{
				type: UserProfileActionTypes.GetDataError,
			};
		}
	}),
	catchError((err: Error) => {
		toast.error(i18n.t("userProfile.getData.errorCritical"));
		return of(<IGetDataErrorAction>{
			type: UserProfileActionTypes.GetDataError,
		});
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
				toast.error(i18n.t("userProfile.updateData.error"));
				return <IUpdateDataErrorAction>{
					type: UserProfileActionTypes.UpdateDataError,
				};
			} else {
				toast.success(i18n.t("userProfile.updateData.success"));
				return <IUpdateDataSuccessAction>{
					type: UserProfileActionTypes.UpdateDataSuccess,
				};
			}
		} catch (err) {
			toast.error(i18n.t("userProfile.updateData.error"));
			return <IUpdateDataErrorAction>{
				type: UserProfileActionTypes.UpdateDataError,
			};
		}
	}),
	catchError((err: Error) => {
		toast.error(i18n.t("userProfile.updateData.errorCritical"));
		return of(<IUpdateDataErrorAction>{
			type: UserProfileActionTypes.UpdateDataError,
		});
	})
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
				toast.error(i18n.t("userProfile.deleteUser.error"));
				return [
					<IDeleteUserErrorAction>{
						type: UserProfileActionTypes.DeleteUserError,
					}
				];
			} else {
				toast.success(i18n.t("userProfile.deleteUser.success"));
				return [
					<IDeleteUserSuccessAction>{
						type: UserProfileActionTypes.DeleteUserSuccess,
					},
					<ILogoutAction>{
						type: LoginActionTypes.Logout,
						hideMessage: true,
					},
				];
			}
		} catch (err) {
			toast.error(i18n.t("userProfile.deleteUser.error"));
			return [
				<IDeleteUserErrorAction>{
					type: UserProfileActionTypes.DeleteUserError,
					error: err,
				}
			];
		}
	}),
	mergeMap(res => res),
	catchError((err: Error) => {
		toast.error(i18n.t("userProfile.deleteUser.errorCritical"));
		return of(<IDeleteUserErrorAction>{
			type: UserProfileActionTypes.DeleteUserError,
			error: err,
		});
	})
);

export const userProfileEpics = [
	getDataEpic,
	getDataSuccessEpic,
	updateDataEpic,
	updateDataSuccesEpic,
	deleteUserEpic,
];

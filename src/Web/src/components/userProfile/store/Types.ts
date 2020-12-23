import { Action } from "redux";
import { IChangePasswordFormData } from "../interfaces/IChangePasswordFormData";
import { IUserData } from "../interfaces/IUserData";
import { IUserProfileFormData } from "../interfaces/IUserProfileFormData";

/** Enum of user prifile action typws */
export enum UserProfileActionTypes {
	GetData = "USER_PROFILE_GET_DATA",
	GetDataSuccess = "USER_PROFILE_GET_DATA_SUCCESS",
	GetDataError = "USER_PROFILE_GET_DATA_ERROR",
	UpdateData = "USER_PROFILE_UPDATE_DATA",
	UpdateDataSuccess = "USER_PROFILE_UPDATE_DATA_SUCCESS",
	UpdateDataError = "USER_PROFILE_UPDATE_DATA_ERROR",
	ChangePassword = "USER_PROFILE_CHANGE_PASSWORD",
	ChangePasswordSuccess = "USER_PROFILE_CHANGE_PASSWORD_SUCCESS",
	ChangePasswordError = "USER_PROFILE_CHANGE_PASSWORD_ERROR",
}

//#region USER PROFILE

export interface IGetDataAction extends Action<UserProfileActionTypes.GetData> {
}

export interface IGetDataSuccessAction extends Action<UserProfileActionTypes.GetDataSuccess> {
	data: IUserData;
}

export interface IGetDataErrorAction extends Action<UserProfileActionTypes.GetDataError> {
}

export interface IUpdateDataAction extends Action<UserProfileActionTypes.UpdateData> {
	data: IUserProfileFormData;
}

export interface IUpdateDataSuccessAction extends Action<UserProfileActionTypes.UpdateDataSuccess> {
}

export interface IUpdateDataErrorAction extends Action<UserProfileActionTypes.UpdateDataError> {
}

export interface IChangePasswordAction extends Action<UserProfileActionTypes.ChangePassword> {
	data: IChangePasswordFormData;
}

export interface IChangePasswordSuccessAction extends Action<UserProfileActionTypes.ChangePasswordSuccess> {
}

export interface IChangePasswordErrorAction extends Action<UserProfileActionTypes.ChangePasswordError> {
}

//#endregion

/** Type of user profile action */
export type UserProfileAction =
	IGetDataAction
	| IGetDataSuccessAction
	| IGetDataErrorAction
	| IUpdateDataAction
	| IUpdateDataSuccessAction
	| IUpdateDataErrorAction
	| IChangePasswordAction
	| IChangePasswordSuccessAction
	| IChangePasswordErrorAction;

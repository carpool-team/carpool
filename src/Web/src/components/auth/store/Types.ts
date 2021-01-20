import { Action } from "redux";
import { ITokenInfo } from "../interfaces/ITokenInfo";
import { ILoginFormData } from "../login/LoginPanel";
import { IRegisterFormData } from "../register/RegisterPanel";

/** Enum of login actions */
export enum LoginActionTypes {
	Login = "AUTH_LOGIN",
	LoginSuccess = "AUTH_LOGIN_SUCCESS",
	LoginError = "AUTH_LOGIN_ERROR",
	Logout = "AUTH_LOGOUT",
	Init = "AUTH_INIT",
	NoToken = "AUTH_NO_TOKEN",
	ClearStore = "AUTH_CLEAR_STORE",
}

/** Enum of register actions */
export enum RegisterActionTypes {
	Register = "AUTH_REGISTER",
	RegisterSuccess = "AUTH_REGISTER_SUCCESS",
	RegisterError = "AUTH_REGISTER_ERROR",
}

//#region LOGIN

export interface IAuthClearStoreAction extends Action<LoginActionTypes.ClearStore> {
}

/** Invokes initialization of Auth store */
export interface IAuthInitAction extends Action<LoginActionTypes.Init> {
}

/** Action when no token present */
export interface INoTokenAction extends Action<LoginActionTypes.NoToken> {
}

/** Action for login */
export interface ILoginAction extends Action<LoginActionTypes.Login> {
	data: ILoginFormData;
}

/** Action for login success */
export interface ILoginSuccessAction extends Action<LoginActionTypes.LoginSuccess> {
	tokenInfo: ITokenInfo;
}

/** Action for login error */
export interface ILoginErrorAction extends Action<LoginActionTypes.LoginError> {
}

/** Action for logout */
export interface ILogoutAction extends Action<LoginActionTypes.Logout> {
	hideMessage?: boolean;
}
//#endregion

//#region REGISTER

/** Action for register */
export interface IRegisterAction extends Action<RegisterActionTypes.Register> {
	data: IRegisterFormData;
}

/** Action for register success */
export interface IRegisterSuccessAction extends Action<RegisterActionTypes.RegisterSuccess> {
}

/** Action for register error */
export interface IRegisterErrorAction extends Action<RegisterActionTypes.RegisterError> {
}

//#endregion

/** Type of login action */
export type LoginAction =
	ILoginAction |
	ILoginSuccessAction |
	ILoginErrorAction |
	ILogoutAction |
	IAuthInitAction |
	INoTokenAction |
	IAuthClearStoreAction;

/** Type of register action */
export type RegisterAction =
	IRegisterAction |
	IRegisterSuccessAction |
	IRegisterErrorAction;

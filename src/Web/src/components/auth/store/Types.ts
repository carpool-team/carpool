import { Action } from "redux";

/** Enum of login actions */
export enum LoginActionTypes {
	Login = "AUTH_LOGIN",
	LoginSuccess = "AUTH_LOGIN_SUCCESS",
	LoginError = "AUTH_LOGIN_ERROR",
}

/** Enum of register actions */
export enum RegisterActionTypes {
	Register = "AUTH_REGISTER",
	RegisterSuccess = "AUTH_REGISTER_SUCCESS",
	RegisterError = "AUTH_REGISTER_ERROR",
}

//#region LOGIN

/** Action for login */
export interface ILoginAction extends Action<LoginActionTypes.Login> {
}

/** Action for login success */
export interface ILoginSuccessAction extends Action<LoginActionTypes.LoginSuccess> {
}

/** Action for login error */
export interface ILoginErrorAction extends Action<LoginActionTypes.LoginError> {
}

//#endregion

//#region REGISTER

/** Action for register */
export interface IRegisterAction extends Action<RegisterActionTypes.Register> {
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
	ILoginErrorAction;

/** Type of register action */
export type RegisterAction =
	IRegisterAction |
	IRegisterSuccessAction |
	IRegisterErrorAction;

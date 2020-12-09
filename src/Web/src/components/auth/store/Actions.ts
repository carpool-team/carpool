import { ITokenInfo } from "../interfaces/ITokenInfo";
import { ILoginFormData } from "../login/LoginPanel";
import { IRegisterFormData } from "../register/RegisterPanel";
import {
	ILoginAction,
	ILoginErrorAction,
	ILoginSuccessAction,
	ILogoutAction,
	IRegisterAction,
	IRegisterErrorAction,
	IRegisterSuccessAction,
	LoginActionTypes,
	RegisterActionTypes
} from "./Types";

//#region Login
export function login(data: ILoginFormData): ILoginAction {
	return {
		type: LoginActionTypes.Login,
		data
	};
}

export function loginSuccess(tokenInfo: ITokenInfo): ILoginSuccessAction {
	return {
		type: LoginActionTypes.LoginSuccess,
		tokenInfo
	};
}

export function loginError(): ILoginErrorAction {
	return {
		type: LoginActionTypes.LoginError
	};
}

export function logout(): ILogoutAction {
	return {
		type: LoginActionTypes.Logout
	};
}
//#endregion

//#region Register
export function register(data: IRegisterFormData): IRegisterAction {
	return {
		type: RegisterActionTypes.Register,
		data
	};
}

export function registerSuccess(): IRegisterSuccessAction {
	return {
		type: RegisterActionTypes.RegisterSuccess,
	};
}

export function registerError(): IRegisterErrorAction {
	return {
		type: RegisterActionTypes.RegisterError
	};
}
//#endregion

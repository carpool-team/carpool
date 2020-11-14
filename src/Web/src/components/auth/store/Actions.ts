import {
	ILoginAction,
	ILoginErrorAction,
	ILoginSuccessAction,
	IRegisterAction,
	IRegisterErrorAction,
	IRegisterSuccessAction,
	LoginActionTypes,
	RegisterActionTypes
} from "./Types";

//#region Login
export function login(): ILoginAction {
	return {
		type: LoginActionTypes.Login
	};
}

export function loginSuccess(): ILoginSuccessAction {
	return {
		type: LoginActionTypes.LoginSuccess,
	};
}

export function loginError(): ILoginErrorAction {
	return {
		type: LoginActionTypes.LoginError
	};
}
//#endregion

//#region Register
export function register(): IRegisterAction {
	return {
		type: RegisterActionTypes.Register
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

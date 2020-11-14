import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { switchMap, mergeMap, catchError } from "rxjs/operators";
import { LoginRequest } from "../api/login/LoginRequest";
import { LoginResponse } from "../api/login/LoginResponse";
import { RegisterRequest } from "../api/register/RegisterRequest";
import { RegisterResponse } from "../api/register/RegisterResponse";
import { ILoginAction, ILoginSuccessAction, IRegisterAction, IRegisterSuccessAction, LoginAction, LoginActionTypes, RegisterAction, RegisterActionTypes } from "./Types";

const registerEpic: Epic<RegisterAction> = (action$) =>
	action$.pipe(
		ofType(RegisterActionTypes.Register),
		switchMap(async (action: IRegisterAction) => {
			const request: RegisterRequest = new RegisterRequest({
				body: { ...action.data }
			});
			const response: RegisterResponse = await request.send();
			return response;
		}),
		// Add endpoint
		// Verify http verb
		// TODO: FINISH EPIC BEHAVIOR AFTER API READY
		mergeMap((response) => {
			if (response.status === 200) {
				return [
					<IRegisterSuccessAction>{
						type: RegisterActionTypes.RegisterSuccess,
					}
				];
			}
		}),
		catchError((err: Error) =>
			of(<any>{
				type: RegisterActionTypes.RegisterError,
				error: err,
			})
		)
	);

const loginEpic: Epic<LoginAction> = (action$) =>
	action$.pipe(
		ofType(LoginActionTypes.Login),
		switchMap(async (action: ILoginAction) => {
			const request: LoginRequest = new LoginRequest({
				body: { ...action.data }
			});
			const response: LoginResponse = await request.send();
			return response;
		}),
		// Add endpoint
		// Verify http verb
		// TODO: FINISH EPIC BEHAVIOR AFTER API READY
		mergeMap((response) => {
			if (response.status === 200) {
				return [
					<ILoginSuccessAction>{
						type: LoginActionTypes.LoginSuccess,
					}
				];
			}
		}),
		catchError((err: Error) =>
			of(<any>{
				type: LoginActionTypes.LoginError,
				error: err,
			})
		)
	);

export const authEpics = [registerEpic, loginEpic];

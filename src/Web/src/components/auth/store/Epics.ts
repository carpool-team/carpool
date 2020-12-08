import { toast } from "react-toastify";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { switchMap, mergeMap, catchError } from "rxjs/operators";
import { tempClientId } from "../../../api/requests/RequestCore";
import i18n from "../../../i18n";
import LayoutRouter, { mainRoutes } from "../../layout/components/LayoutRouter";
import { IRedirectAction, IRedirectedAction, LayoutActionTypes } from "../../layout/store/Types";
import { LoginRequest } from "../api/login/LoginRequest";
import { LoginResponse } from "../api/login/LoginResponse";
import { RegisterRequest } from "../api/register/RegisterRequest";
import { RegisterResponse } from "../api/register/RegisterResponse";
import { ITokenInfo } from "../interfaces/ITokenInfo";
import { ILoginAction, ILoginErrorAction, ILoginSuccessAction, IRegisterAction, IRegisterErrorAction, IRegisterSuccessAction, LoginAction, LoginActionTypes, RegisterAction, RegisterActionTypes } from "./Types";

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
		mergeMap((response) => {
			if (!response.isError) {
				toast.success(i18n.t("auth.registerSuccess"));
				return [
					<IRegisterSuccessAction>{
						type: RegisterActionTypes.RegisterSuccess,
					},
					<IRedirectAction>{
						type: LayoutActionTypes.Redirect,
						to: `/${mainRoutes.login}`
					}
				];
			} else {
				const msg: string = i18n.t("error." + response.responseException[0]?.code);
				toast.error(msg);
				return [
					<IRegisterErrorAction>{
						type: RegisterActionTypes.RegisterError,
						error: null,
					},
				];
			}
		}),
		catchError((err: Error) => {
			return of(<any>{
				type: RegisterActionTypes.RegisterError,
				error: err,
			});
		})
	);

const loginEpic: Epic<LoginAction> = (action$) =>
	action$.pipe(
		ofType(LoginActionTypes.Login),
		switchMap(async (action: ILoginAction) => {
			const request: LoginRequest = new LoginRequest({
				body: {
					...action.data,
					clientId: tempClientId
				}
			});
			const response: LoginResponse = await request.send();

			return response;
		}),
		mergeMap((response) => {
			if (!response.isError) {
				toast.success(i18n.t("auth.loginSuccess"));
				const tokenInfo: ITokenInfo = {
					refreshToken: response.result.refreshToken,
					token: response.result.token,
					expires: response.result.expires,
				};
				return [
					<ILoginSuccessAction>{
						type: LoginActionTypes.LoginSuccess,
						tokenInfo
					},
					<IRedirectAction>{
						type: LayoutActionTypes.Redirect,
						to: `/${mainRoutes.default}`,
					}
				];
			} else {
				const msg: string = i18n.t("error." + response.responseException[0]?.code);
				toast.error(msg);
				return [
					<ILoginErrorAction>{
						type: LoginActionTypes.LoginError,
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

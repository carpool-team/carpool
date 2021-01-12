import { toast } from "react-toastify";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { switchMap, mergeMap, catchError } from "rxjs/operators";
import App from "../../../App";
import { parseJwt } from "../../../helpers/UniversalHelper";
import i18n from "../../../i18n";
import { GenericActionTypes as GroupGenericActionTypes, IGroupsClearStoreAction } from "../../groups/store/Types";
import { mainRoutes } from "../../layout/components/LayoutRouter";
import { ILayoutClearStoreAction, IRedirectAction, ISetLoaderVisibleAction, LayoutActionTypes } from "../../layout/store/Types";
import { IRidesClearStoreAction, GenericActionTypes as RidesGenericActionTypes } from "../../rides/store/Types";
import { IUserClearStoreAction, UserProfileActionTypes } from "../../userProfile/store/Types";
import { LoginRequest } from "../api/login/LoginRequest";
import { LoginResponse } from "../api/login/LoginResponse";
import { RegisterRequest } from "../api/register/RegisterRequest";
import { RegisterResponse } from "../api/register/RegisterResponse";
import { ITokenInfo } from "../interfaces/ITokenInfo";
import {
	IAuthClearStoreAction,
	IAuthInitAction,
	ILoginAction,
	ILoginErrorAction,
	ILoginSuccessAction,
	ILogoutAction,
	INoTokenAction,
	IRegisterAction,
	IRegisterErrorAction,
	IRegisterSuccessAction,
	LoginAction,
	LoginActionTypes,
	RegisterAction,
	RegisterActionTypes
} from "./Types";

const loginGenericErrorCode: string = "loginGeneric";
const registerGenericErrorCode: string = "registerGeneric";
const loginInvalidErrorCode: string = "loginInvalid";

const authInitEpic: Epic<LoginAction> = (action$) => action$.pipe(
	ofType(LoginActionTypes.Init),
	switchMap((_action: IAuthInitAction) => {
		const tokenInfoString: string = window.localStorage.getItem(process.env[App.storageKeys.tokenInfoStorage]);
		if (tokenInfoString) {
			return [<ILoginSuccessAction>{
				type: LoginActionTypes.LoginSuccess,
				tokenInfo: JSON.parse(tokenInfoString),
			}];
		} else {
			return [<INoTokenAction>{
				type: LoginActionTypes.NoToken,
			}];
		}
	}),
);

const registerEpic: Epic<RegisterAction> = (action$) =>
	action$.pipe(
		ofType(RegisterActionTypes.Register),
		switchMap(async (action: IRegisterAction) => {
			const request: RegisterRequest = new RegisterRequest({
				body: { ...action.data }
			});
			try {
				const response: RegisterResponse = await request.send();
				return response;
			} catch (err) {
				console.log(err);
				return undefined;
			}
		}),
		mergeMap((response) => {
			if (response && !response.isError) {
				toast.success(i18n.t("auth.registerSuccess"));
				return [
					<IRegisterSuccessAction>{
						type: RegisterActionTypes.RegisterSuccess,
					},
					<IRedirectAction>{
						type: LayoutActionTypes.Redirect,
						to: `/${mainRoutes.login}`
					},
					<ISetLoaderVisibleAction>{
						type: LayoutActionTypes.SetLoaderVisible,
						visible: false,
					}
				];
			} else {
				const msg: string = i18n.t("error." + registerGenericErrorCode);
				toast.error(msg);
				return [
					<IRegisterErrorAction>{
						type: RegisterActionTypes.RegisterError,
						error: null,
					},
					<ISetLoaderVisibleAction>{
						type: LayoutActionTypes.SetLoaderVisible,
						visible: false,
					}
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
				body: { ...action.data, }
			});
			try {
				const response: LoginResponse = await request.send();
				return response;
			} catch (err) {
				console.log(err);
				return undefined;
			}
		}),
		mergeMap((response) => {
			if (response && !response.isError) {
				toast.success(i18n.t("auth.loginSuccess"));
				const tokenInfo: ITokenInfo = {
					refreshToken: response.result.refreshToken,
					token: response.result.token,
					expires: response.result.expires,
					payload: parseJwt(response.result.token),
				};

				window.localStorage.setItem(process.env[App.storageKeys.tokenInfoStorage], JSON.stringify(tokenInfo));

				console.log("TOKEN PAYLOAD: ", tokenInfo.payload);
				return [
					<ILoginSuccessAction>{
						type: LoginActionTypes.LoginSuccess,
						tokenInfo
					},
					<IRedirectAction>{
						type: LayoutActionTypes.Redirect,
						to: `/${mainRoutes.default}`,
					},
					<ISetLoaderVisibleAction>{
						type: LayoutActionTypes.SetLoaderVisible,
						visible: false,
					}
				];
			} else {
				const msg: string = i18n.t("error." + loginInvalidErrorCode);
				toast.error(msg);
				return [
					<ILoginErrorAction>{
						type: LoginActionTypes.LoginError,
					},
					<ISetLoaderVisibleAction>{
						type: LayoutActionTypes.SetLoaderVisible,
						visible: false,
					}
				];
			}
		}),
		catchError((err: Error) => {
			return of(<any>{
				type: LoginActionTypes.LoginError,
				error: err,
			});
		})
	);

const logoutEpic: Epic<LoginAction, any> = (action$) => action$.pipe(
	ofType(LoginActionTypes.Logout),
	switchMap((_action: ILogoutAction) => {
		window.localStorage.removeItem(process.env[App.storageKeys.tokenInfoStorage]);
		return [
			<IAuthClearStoreAction>{
				type: LoginActionTypes.ClearStore,
			},
			<IUserClearStoreAction>{
				type: UserProfileActionTypes.ClearStore,
			},
			<IRidesClearStoreAction>{
				type: RidesGenericActionTypes.ClearStore
			},
			<IGroupsClearStoreAction>{
				type: GroupGenericActionTypes.ClearStore,
			},
			<ILayoutClearStoreAction>{
				type: LayoutActionTypes.ClearStore,
			}
		];
	}),
);

export const authEpics = [
	registerEpic,
	loginEpic,
	authInitEpic,
	logoutEpic,
];

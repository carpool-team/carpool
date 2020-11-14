import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { switchMap, mergeMap, catchError } from "rxjs/operators";
import { RegisterRequest } from "../api/register/RegisterRequest";
import { RegisterResponse } from "../api/register/RegisterResponse";
import { IRegisterAction, IRegisterSuccessAction, RegisterAction, RegisterActionTypes } from "./Types";

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

export const authEpics = [registerEpic];

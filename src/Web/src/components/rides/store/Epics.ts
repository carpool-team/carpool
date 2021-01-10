import { Epic, ofType } from "redux-observable";
import { switchMap, catchError, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import {
	IApiErrorAction,
	GenericActionTypes,
	GenericAction,
	RideRequestsAction,
	RideRequestsActionTypes,
	IGetRideRequestsAction,
	IGetRideRequestsErrorAction,
	IGetRideRequestsSuccessAction,
	IAnswerRideRequestAction,
	IAnswerRideRequestSuccessAction,
	IAnswerRideRequestErrorAction
} from "./Types";
import { toast } from "react-toastify";
import { GetRideRequestsRequest } from "../api/getRideRequests/GetRideRequestsRequest";
import { ISetLoaderVisibleAction, LayoutAction, LayoutActionTypes } from "../../layout/store/Types";
import { UpdateRideRequestResponse } from "../api/updateRideRequest/UpdateRideRequestResponse";
import { UpdateRideRequestRequest } from "../api/updateRideRequest/UpdateRideRequestRequest";

const getRideRequestsEpic: Epic<RideRequestsAction | LayoutAction> = (action$) =>
	action$.pipe(
		ofType(RideRequestsActionTypes.GetRideRequests),
		switchMap(async (_action: IGetRideRequestsAction) => {
			const requestOwner = new GetRideRequestsRequest(true);
			const requestParticipant = new GetRideRequestsRequest(false);
			try {
				const responseOwner = await requestOwner.send();
				const responseParticipant = await requestParticipant.send();
				return {
					requestsParticipant: responseParticipant.result,
					requestsOwner: responseOwner.result,
					isError: false,
				};
			} catch (err) {
				return {
					isError: true,
					error: err,
				};
			}
		}),
		mergeMap((result) => {
			if (result.isError === false) {
				return [
					<IGetRideRequestsSuccessAction>{
						type: RideRequestsActionTypes.GetRideRequestsSuccess,
						requestsParticipant: result.requestsParticipant,
						requestsOwner: result.requestsOwner
					},
					<ISetLoaderVisibleAction>{
						type: LayoutActionTypes.SetLoaderVisible,
						visible: false,
					}
				];
			} else {
				return [
					<IGetRideRequestsErrorAction>{
						type: RideRequestsActionTypes.GetRideRequestsError,
						error: result.error,
					},
					<ISetLoaderVisibleAction>{
						type: LayoutActionTypes.SetLoaderVisible,
						visible: false,
					}
				];
			}
		}),
		catchError((err: Error) =>
			of(<IGetRideRequestsErrorAction>{
				type: RideRequestsActionTypes.GetRideRequestsError,
				error: err
			})
		)
	);

const answerRideRequestEpic: Epic<RideRequestsAction | LayoutAction> = (action$) =>
	action$.pipe(
		ofType(RideRequestsActionTypes.AnswerRideRequest),
		switchMap(async (action: IAnswerRideRequestAction) => {
			const request: UpdateRideRequestRequest = new UpdateRideRequestRequest({
				body: {
					isAccepted: action.isAccepted,
					rideRequestId: action.id
				}
			});
			try {
				const response: UpdateRideRequestResponse = await request.send();
				return {
					response,
					owned: action.owned,
				};
			} catch (err) {
				return undefined;
			}
		}),
		mergeMap((result) => {
			if (result.response && !result.response.isError) {
				return [
					<IGetRideRequestsAction>{
						type: RideRequestsActionTypes.GetRideRequests,
						owner: result.owned,
					},
					<IAnswerRideRequestSuccessAction>{
						type: RideRequestsActionTypes.AnswerRideRequestSuccess
					},
					<ISetLoaderVisibleAction>{
						type: LayoutActionTypes.SetLoaderVisible,
						visible: false,
					}
				];
			} else {
				return [
					<IAnswerRideRequestErrorAction>{
						type: RideRequestsActionTypes.AnswerRideRequestError
					},
					<ISetLoaderVisibleAction>{
						type: LayoutActionTypes.SetLoaderVisible,
						visible: false,
					}
				];
			}
		}),
		catchError((_err: Error) =>
			of(<IGetRideRequestsErrorAction>{
				type: RideRequestsActionTypes.GetRideRequestsError,
			})
		)
	);

const apiErrorEpic: Epic<GenericAction> = (action$, _state$) => action$.pipe(
	ofType(GenericActionTypes.ApiError),
	mergeMap(async (action: IApiErrorAction) => {
		await (async () => {
			toast.error(action.errorMessage);
		})();
		return action;
	})
);

export const rideEpics = [
	getRideRequestsEpic,
	answerRideRequestEpic,
	apiErrorEpic,
];

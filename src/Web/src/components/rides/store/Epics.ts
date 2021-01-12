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
	IAnswerRideRequestErrorAction,
	RideAction,
	RideActionTypes,
	ILeaveRideAction,
	ILeaveRideErrorAction,
	ILeaveRideSuccessAction,
	IDeleteRideAction,
	IDeleteRideErrorAction,
	IDeleteRideSuccessAction
} from "./Types";
import { toast } from "react-toastify";
import { GetRideRequestsRequest } from "../api/getRide/GetRideRequestsRequest";
import { ISetLoaderVisibleAction, LayoutAction, LayoutActionTypes } from "../../layout/store/Types";
import { UpdateRideRequestResponse } from "../api/updateRide/UpdateRideRequestResponse";
import { UpdateRideRequestRequest } from "../api/updateRide/UpdateRideRequestRequest";
import { LeaveRideRequest } from "../api/leaveRide/LeaveRideRequest";
import { getId } from "../../../helpers/UniversalHelper";
import { IGetRidesAction, RidesActionTypes, RideAction as GroupRideAction } from "../../groups/store/Types";
import { DeleteRideRequest } from "../api/deleteRide/DeleteRideRequest";

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
					isError: (responseOwner.isError || responseParticipant.isError) ?? false,
					errorMessageOwner: responseOwner.responseException?.exceptionMessage,
					errorMessageParticipant: responseParticipant.responseException?.exceptionMessage,
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
					isError: response.isError ?? false,
				};
			} catch (err) {
				return {
					isError: true,
					error: err,
				};
			}
		}),
		mergeMap((result) => {
			if (result.isError === false && result.response) {
				return [
					<IGetRideRequestsAction>{
						type: RideRequestsActionTypes.GetRideRequests,
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
						type: RideRequestsActionTypes.AnswerRideRequestError,
						error: result.error
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

const leaveRideEpic: Epic<RideAction | GroupRideAction> = (action$) =>
	action$.pipe(
		ofType(RideActionTypes.LeaveRide),
		switchMap(async (action: ILeaveRideAction) => {
			const request = new LeaveRideRequest({
				rideId: action.rideId,
				userId: getId(),
			});
			try {
				const response = await request.send();
				if (response.isError || response.status >= 300) {
					return [
						<ILeaveRideErrorAction>{
							type: RideActionTypes.LeaveRideError,
							error: null,
						}
					];
				} else {
					return [
						<ILeaveRideSuccessAction>{
							type: RideActionTypes.LeaveRideSuccess,
						},
						<IGetRidesAction>{
							type: RidesActionTypes.GetRides,

						}
					];
				}
			} catch (err) {
				return [
					<ILeaveRideErrorAction>{
						type: RideActionTypes.LeaveRideError,
						error: err,
					}
				];
			}
		}),
		mergeMap(res => res),
		catchError((err: Error) =>
			of(<ILeaveRideErrorAction>{
				type: RideActionTypes.LeaveRideError,
				error: err,
			})
		)
	);

const deleteRideEpic: Epic<RideAction | GroupRideAction> = (action$) =>
	action$.pipe(
		ofType(RideActionTypes.DeleteRide),
		switchMap(async (action: IDeleteRideAction) => {
			const request = new DeleteRideRequest({
				rideId: action.rideId,
				recurring: action.recurring ?? false,
			});
			try {
				const response = await request.send();
				if (response.isError || response.status >= 300) {
					return [
						<IDeleteRideErrorAction>{
							type: RideActionTypes.DeleteRideError,
							error: null,
						}
					];
				} else {
					return [
						<IDeleteRideSuccessAction>{
							type: RideActionTypes.DeleteRideSuccess,
						},
						<IGetRidesAction>{
							type: RidesActionTypes.GetRides,

						}
					];
				}
			} catch (err) {
				return [
					<IDeleteRideErrorAction>{
						type: RideActionTypes.DeleteRideError,
						error: err,
					}
				];
			}
		}),
		mergeMap(res => res),
		catchError((err: Error) =>
			of(<IDeleteRideErrorAction>{
				type: RideActionTypes.DeleteRideError,
				error: err,
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
	leaveRideEpic,
	deleteRideEpic,
];

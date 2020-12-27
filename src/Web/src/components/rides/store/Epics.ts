import { Epic, ofType } from "redux-observable";
import { switchMap, catchError, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import {
	IApiErrorAction, GenericActionTypes, GenericAction, RideRequestsAction, RideRequestsActionTypes, IGetRideRequestsAction, IGetRideRequestsErrorAction, IGetRideRequestsSuccessAction
} from "./Types";
import { toast } from "react-toastify";
import { GetRideRequestsRequest } from "../api/getRideRequests/GetRideRequestsRequest";
import { GetRideRequestsResponse } from "../api/getRideRequests/GetRideRequestsResponse";
import { ISetLoaderVisibleAction, LayoutAction, LayoutActionTypes } from "../../layout/store/Types";

const getRideRequestsEpic: Epic<RideRequestsAction | LayoutAction> = (action$) =>
	action$.pipe(
		ofType(RideRequestsActionTypes.GetRideRequests),
		switchMap(async (action: IGetRideRequestsAction) => {
			const request: GetRideRequestsRequest = new GetRideRequestsRequest(action.owner);
			try {
				const response: GetRideRequestsResponse = await request.send();
				return {
					response,
					owner: action.owner,
				};
			} catch (err) {
				return undefined;
			}
		}),
		mergeMap((result) => {
			if (result.response && !result.response.isError) {
				return [
					<IGetRideRequestsSuccessAction>{
						type: RideRequestsActionTypes.GetRideRequestsSuccess,
						requests: result.response.result,
						owner: result.owner,
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
	apiErrorEpic,
];

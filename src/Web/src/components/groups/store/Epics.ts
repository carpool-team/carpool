import { Epic, ofType } from "redux-observable";
import { switchMap, catchError, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import {
	GroupsAction,
	GroupsActionTypes,
	IAddGroupAction,
	IGetGroupsAction,
	IGetGroupsActionSuccess,
	IGetInvitesAction,
	IGetInvitessActionSuccess,
	InviteAction,
	InvitesActionTypes,
	IAnswerInviteAction,
	IAnswerInviteActionSuccess,
	RideAction,
	RidesActionTypes,
	IGetRidesAction,
	IGetRidesActionSuccess,
	IParticipateInRideAction,
	IParticipateInRideActionSuccess,
	IParticipateInRideActionError, IAddGroupActionError
} from "./Types";
import _ from "lodash";
import { toast } from "react-toastify";
import { GetGroupsRequest } from "../api/getGroups/GetGroupsRequest";
import { GetGroupsResponse } from "../api/getGroups/GetGroupsResponse";
import { AddGroupRequest } from "../api/addGroup/AddGroupRequest";
import { GetInvitesRequest } from "../api/getInvites/GetInvitesRequest";
import { AnswerInviteRequest } from "../api/answerInvite/AnswerInviteRequest";
import { AnswerInviteResponse } from "../api/answerInvite/AnswerInviteResponse";
import { GetInvitesResponse } from "../api/getInvites/GetInvitesResponse";
import { AddGroupResponse } from "../api/addGroup/AddGroupResponse";
import { GetRidesResponse } from "../api/getRides/GetRidesResponse";
import { GetRidesRequest } from "../api/getRides/GetRidesRequest";
import { ParticipateInRideResponse } from "../api/participateInRide/ParticipateInRideResponse";
import { ParticipateInRideRequest } from "../api/participateInRide/ParticipateInRideRequest";
import { getId } from "../../../helpers/UniversalHelper";
import { IAuthState } from "../../auth/store/State";
import { UpdateGroupRequest } from "../api/updateGroup/UpdateGroupRequest";
import { UpdateGroupResponse } from "../api/updateGroup/UpdateGroupResponse";

const addGroupEpic: Epic<GroupsAction> = (action$, state$) =>
	action$.pipe(
		ofType(GroupsActionTypes.AddGroup),
		switchMap(async (action: IAddGroupAction) => {
			const ownerId: number = Number((state$.value.auth as IAuthState).tokenInfo?.payload?.sub);
			const request: AddGroupRequest = new AddGroupRequest({
				body: {
					ownerId,
					location: {
						latitude: action.group.location.latitude,
						longitude: action.group.location.longitude,
					},
					code: action.group.code,
					name: action.group.name,
				}
			});
			const response: AddGroupResponse = await request.send();
			if (response.status > 200 || response.isError) {
				toast.error("Error while adding group: " + response.title ?? response.responseException?.exceptionMessage);
				return [
					<IAddGroupActionError>{
						type: GroupsActionTypes.AddGroupError,
						error: new Error(response.title ?? response.responseException?.exceptionMessage)
					}
				];
			} else {
				return [
					<IGetGroupsAction>{
						type: GroupsActionTypes.GetGroups,
						userOnly: false,
					}
				];
			}
		}),
		mergeMap((response) => response),
		catchError((err: Error) =>
			of(<any>{
				type: GroupsActionTypes.AddGroupError,
				error: err,
			})
		)
	);

const getGroupsEpic: Epic<GroupsAction> = (action$, state$) =>
	action$.pipe(
		ofType(GroupsActionTypes.GetGroups),
		switchMap(async (action: IGetGroupsAction) => {
			const uid: string = (state$.value.auth as IAuthState).tokenInfo?.payload?.sub;
			const request: GetGroupsRequest = new GetGroupsRequest({
				userId: uid,
			});
			const response: GetGroupsResponse = await request.send();
			return response.result;
		}),
		mergeMap((response) => {
			return [
				<IGetGroupsActionSuccess>{
					type: GroupsActionTypes.GetGroupsSuccess,
					groups: response,
				},
			];
		}),
		catchError((err: Error) =>
			of(<any>{
				type: GroupsActionTypes.GetGroupsError,
				error: err,
			})
		)
	);

const getInvitesEpic: Epic<InviteAction> = (action$, state$) =>
	action$.pipe(
		ofType(InvitesActionTypes.GetInvites),
		switchMap(async (action: IGetInvitesAction) => {
			const uid: string = (state$.value.auth as IAuthState).tokenInfo?.payload?.sub;
			const request: GetInvitesRequest = new GetInvitesRequest({
				userOnly: action.userOnly,
				userId: uid,
			});
			const response: GetInvitesResponse = await request.send();
			return response.result;
		}),
		mergeMap((response) => {
			return [
				<IGetInvitessActionSuccess>{
					type: InvitesActionTypes.GetInvitesSuccess,
					invites: response,
				},
			];
		}),
		catchError((err: Error) =>
			of(<any>{
				type: InvitesActionTypes.GetInvitesError,
				error: err,
			})
		)
	);

const answerInviteEpic: Epic<InviteAction> = (action$) =>
	action$.pipe(
		ofType(InvitesActionTypes.AnswerInvite),
		switchMap(async (action: IAnswerInviteAction) => {
			const request: AnswerInviteRequest = new AnswerInviteRequest({
				groupInviteId: action.inviteId,
				isAccepted: action.accepted
			});
			const response: AnswerInviteResponse = await request.send();
			return {
				response: response.status,
				id: action.inviteId,
			};
		}),
		mergeMap((result) => {
			if (result.response === 200) {
				return [
					<IAnswerInviteActionSuccess>{
						type: InvitesActionTypes.AnswerInviteSuccess,
						inviteId: result.id,
					},
					<IGetGroupsAction>{
						type: GroupsActionTypes.GetGroups,
						userOnly: true,
					}
				];
			} else {
				throw "Error occured in answering invitation";
			}
		}),
		catchError((err: Error) =>
			of(<any>{
				type: InvitesActionTypes.AnswerInviteError,
				error: err,
			})
		)
	);

const getRidesEpic: Epic<RideAction> = (action$, state$) =>
	action$.pipe(
		ofType(RidesActionTypes.GetRides),
		switchMap(async (_action: IGetRidesAction) => {
			const uid: string = (state$.value.auth as IAuthState).tokenInfo?.payload?.sub;
			const ownedRequest: GetRidesRequest = new GetRidesRequest({
				userId: uid,
				owned: true,
			});
			const participatedRequest: GetRidesRequest = new GetRidesRequest({
				userId: uid,
				participated: true,
			});
			const responseOwned: GetRidesResponse = await ownedRequest.send();
			const responseParticipated: GetRidesResponse = await participatedRequest.send();
			return {
				owned: responseOwned.result,
				participated: responseParticipated.result,
			};
		}),
		mergeMap((response) => {
			return [
				<IGetRidesActionSuccess>{
					type: RidesActionTypes.GetRidesSuccess,
					ridesOwned: response.owned,
					ridesParticipated: response.participated
				},
			];
		}),
		catchError((err: Error) =>
			of(<any>{
				type: RidesActionTypes.GetRidesError,
				error: err,
			})
		)
	);

const participateInRideEpic: Epic<RideAction> = (action$) =>
	action$.pipe(
		ofType(RidesActionTypes.ParticipateInRide),
		switchMap(async (action: IParticipateInRideAction) => {
			const request: ParticipateInRideRequest = new ParticipateInRideRequest({
				rideId: action.rideId,
				participantId: getId(),
			});
			const response: ParticipateInRideResponse = await request.send();
			return {
				id: action.rideId,
				isSuccess: response.status === 200,
			};
		}),
		mergeMap(response => {
			if (response.isSuccess) {
				toast.success("Succesfully participated in ride!");
				return [
					<IGetRidesAction>{
						type: RidesActionTypes.GetRides,
						userOnly: true,
					},
					<IParticipateInRideActionSuccess>{
						type: RidesActionTypes.ParticipateInRideSuccess,
						rideId: response.id,
					}
				];
			} else {
				toast.error("Error while participating in ride, try again...");
				return [
					<IParticipateInRideActionError>{
						type: RidesActionTypes.ParticipateInRideError,
						error: null,
					}
				];
			}
		}),
		catchError((err: Error) => {
			toast.error("Could not participate in ride :(");
			return of(<any>{
				type: RidesActionTypes.ParticipateInRideError,
				error: err,
			});
		})
	);

const addRideEpic: Epic<RideAction> = (action$, state$) => action$.pipe(
	ofType(RidesActionTypes.AddRide)
);

export const groupEpics = [
	addGroupEpic,
	getGroupsEpic,
	getInvitesEpic,
	answerInviteEpic,
	getRidesEpic,
	participateInRideEpic,
	addRideEpic,
];

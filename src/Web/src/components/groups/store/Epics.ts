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
import { tempCoords, tempUserId } from "../../../api/requests/RequestCore";
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

const addGroupEpic: Epic<GroupsAction> = (action$) =>
	action$.pipe(
		ofType(GroupsActionTypes.AddGroup),
		switchMap(async (action: IAddGroupAction) => {
			const request: AddGroupRequest = new AddGroupRequest({
				body: {
					name: action.group.name,
					code: action.group.code,
					ownerId: tempUserId,
					latitude: tempCoords.latitude,
					longitude: tempCoords.longitude,
				}
			});
			const response: AddGroupResponse = await request.send();
			return response;
		}),
		mergeMap((response) => {
			if (response.status > 200) {
				toast.error("Error while adding group: " + response.title);
				return [
					<IAddGroupActionError>{
						type: GroupsActionTypes.AddGroupError,
						error: new Error(response.title)
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
		catchError((err: Error) =>
			of(<any>{
				type: GroupsActionTypes.AddGroupError,
				error: err,
			})
		)
	);

const getGroupsEpic: Epic<GroupsAction> = (action$) =>
	action$.pipe(
		ofType(GroupsActionTypes.GetGroups),
		switchMap(async (action: IGetGroupsAction) => {
			const request: GetGroupsRequest = new GetGroupsRequest({ userOnly: action.userOnly });
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

const getInvitesEpic: Epic<InviteAction> = (action$) =>
	action$.pipe(
		ofType(InvitesActionTypes.GetInvites),
		switchMap(async (action: IGetInvitesAction) => {
			const request: GetInvitesRequest = new GetInvitesRequest({ userOnly: action.userOnly });
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

const getRidesEpic: Epic<RideAction> = (action$) =>
	action$.pipe(
		ofType(RidesActionTypes.GetRides),
		switchMap(async (action: IGetRidesAction) => {
			const request: GetRidesRequest = new GetRidesRequest({
				userOnly: action.userOnly
			});
			const response: GetRidesResponse = await request.send();
			return response.result;
		}),
		mergeMap((response) => {
			return [
				<IGetRidesActionSuccess>{
					type: RidesActionTypes.GetRidesSuccess,
					rides: response,
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
				participantId: tempUserId,
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

export const groupEpics = [addGroupEpic, getGroupsEpic, getInvitesEpic, answerInviteEpic, getRidesEpic, participateInRideEpic];

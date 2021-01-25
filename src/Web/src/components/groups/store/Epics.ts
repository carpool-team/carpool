import { Epic, ofType } from "redux-observable";
import { switchMap, catchError, mergeMap, filter } from "rxjs/operators";
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
	IParticipateInRideActionError,
	IAddGroupActionError,
	IAddRideAction,
	IAddInvitesAction,
	IApiErrorAction,
	GenericActionTypes,
	GenericAction,
	IGetGroupUsersAction,
	IGetGroupUsersErrorAction,
	IGetGroupUsersSuccessAction,
	ISetSelectedGroupAction,
	IGetSelectedGroupDetailsSuccessAction,
	IGetSelectedGroupDetailsErrorAction,
	IGetRidesAvailableActionError,
	IGetRidesAvailableActionSuccess,
	IGetRidesAvailableAction,
	ILeaveGroupAction,
	ILeaveGroupErrorAction,
	ILeaveGroupSuccessAction,
	IDeleteUserFromGroupAction,
	IDeleteUserFromGroupErrorAction,
	IDeleteUserFromGroupSuccessAction,
	IUpdateGroupDetailsAction,
	IDeleteGroupAction,
	IDeleteGroupSuccessAction,
	IDeleteGroupErrorAction,
	IEditGroupAction,
	IEditGroupErrorAction,
	IEditGroupSuccessAction,
	IGetGroupsActionError,
	IGetInvitesActionError,
	IAnswerInviteActionError,
	IGetRidesActionError,
	IGetReportAction,
	IGetReportActionError,
	IGetReportActionSuccess,
	IAddRideErrorAction,
	IAddRideSuccessAction
} from "./Types";
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
import { dateToIsoString, getId } from "../../../helpers/UniversalHelper";
import { IAuthState } from "../../auth/store/State";
import { AddRideRequest } from "../api/addRide/AddRideRequest";
import { AddRideResponse } from "../api/addRide/AddRideResponse";
import { AddInviteRequest } from "../api/addInvite/AddInviteRequest";
import { IRedirectAction, ISetLoaderVisibleAction, LayoutAction, LayoutActionTypes } from "../../layout/store/Types";
import { mainRoutes } from "../../layout/components/LayoutRouter";
import { GetGroupUsersRequest } from "../api/getGroupUsers/GetGroupUsersRequest";
import { GetGroupDetailsRequest } from "../api/getGroupDetails/GetGroupDetailsRequest";
import { IGroupsState } from "./State";
import { AddRideRequestResponse } from "../../rides/api/addRide/AddRideRequestResponse";
import { AddRideRequestRequest } from "../../rides/api/addRide/AddRideRequestRequest";
import { DeleteUserFromGroupRequest } from "../api/deleteUserFromGroup/DeleteUserFromGroupRequest";
import { DeleteGroupRequest } from "../api/deleteGroup/DeleteGroupRequest";
import { UpdateGroupRequest } from "../api/updateGroup/UpdateGroupRequest";
import i18n from "../../../i18n";
import { GetReportRequest } from "../api/getReport/GetReportRequest";
import moment from "moment";
import { IRideDays } from "../../rides/components/addRide/interfaces/IRideDays";
import { date } from "faker";

const getMappedDays = (weekDays: IRideDays) => {
	let weekDaysBinary: number = 0;
	if (weekDays.all) {
		weekDaysBinary = 1111111;
	} else {
		if (weekDays.monday) {
			weekDaysBinary += 1;
		}
		if (weekDays.tuesday) {
			weekDaysBinary += 10;
		}
		if (weekDays.wednesday) {
			weekDaysBinary += 100;
		}
		if (weekDays.thursday) {
			weekDaysBinary += 1000;
		}
		if (weekDays.friday) {
			weekDaysBinary += 10000;
		}
		if (weekDays.saturday) {
			weekDaysBinary += 100000;
		}
		if (weekDays.sunday) {
			weekDaysBinary += 1000000;
		}
	}
	const mappedDays: number = parseInt(weekDaysBinary.toString(), 2);
	return mappedDays;
};

const addGroupEpic: Epic<GroupsAction> = (action$, state$) =>
	action$.pipe(
		ofType(GroupsActionTypes.AddGroup),
		switchMap(async (action: IAddGroupAction) => {
			const ownerId: string = (state$.value.auth as IAuthState).tokenInfo?.payload?.sub;
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
			try {
				const response: AddGroupResponse = await request.send();
				if (response.status > 299 || response.isError) {
					toast.error(i18n.t("group.add.error") + response.title ?? response.responseException?.exceptionMessage);
					return [
						<IAddGroupActionError>{
							type: GroupsActionTypes.AddGroupError,
							error: new Error(response.title ?? response.responseException?.exceptionMessage)
						}
					];
				} else {
					toast.success(i18n.t("group.add.success"));
					return [
						<IGetGroupsAction>{
							type: GroupsActionTypes.GetGroups,
						}
					];
				}
			} catch (err) {
				toast.error(i18n.t("group.add.errorGeneric"));
				return [
					<IAddGroupActionError>{
						type: GroupsActionTypes.AddGroupError,
						error: err
					}
				];
			}
		}),
		mergeMap((response) => response),
		catchError((err: Error) => {
			toast.error(i18n.t("group.add.errorCritical"));
			return of(<any>{
				type: GroupsActionTypes.AddGroupError,
				error: err,
			});
		})
	);

const getGroupsEpic: Epic<GroupsAction> = (action$, state$) =>
	action$.pipe(
		ofType(GroupsActionTypes.GetGroups),
		switchMap(async (action: IGetGroupsAction) => {
			const uid: string = (state$.value.auth as IAuthState).tokenInfo?.payload?.sub;
			const request: GetGroupsRequest = new GetGroupsRequest({
				userId: uid,
			});
			try {
				const response: GetGroupsResponse = await request.send();
				return {
					result: response
				};
			} catch (err) {
				return {
					err
				};
			}
		}),
		mergeMap((response) => {
			if (response.err || response.result?.isError) {
				toast.error(i18n.t("groups.get.error"));
				return [
					<IGetGroupsActionError>{
						type: GroupsActionTypes.GetGroupsError,
					}
				];
			} else {
				return [
					<IGetGroupsActionSuccess>{
						type: GroupsActionTypes.GetGroupsSuccess,
						groups: response.result.result,
					},
				];
			}
		}),
		catchError((err: Error) => {
			toast.error(i18n.t("groups.get.errorCritical"));
			return of(<any>{
				type: GroupsActionTypes.GetGroupsError,
				error: err,
			});
		})
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
			try {
				const response: GetInvitesResponse = await request.send();
				return response;
			} catch (err) {
				return undefined;
			}
		}),
		mergeMap((response) => {
			if (response && (!response.isError || response.status < 300)) {
				return [
					<IGetInvitessActionSuccess>{
						type: InvitesActionTypes.GetInvitesSuccess,
						invites: response.result,
					},
				];
			} else {
				toast.error(i18n.t("invites.get.error"));
				return [
					<IGetInvitesActionError>{
						type: InvitesActionTypes.GetInvitesError,
						error: null,
					}
				];
			}
		}),
		catchError((err: Error) => {
			toast.error(i18n.t("invites.get.errorCritical"));
			return of(<any>{
				type: InvitesActionTypes.GetInvitesError,
				error: err,
			});
		})
	);

const answerInviteEpic: Epic<InviteAction | GroupsAction> = (action$) =>
	action$.pipe(
		ofType(InvitesActionTypes.AnswerInvite),
		switchMap(async (action: IAnswerInviteAction) => {
			const request: AnswerInviteRequest = new AnswerInviteRequest({
				groupInviteId: action.inviteId,
				isAccepted: action.accepted
			});
			try {
				const response: AnswerInviteResponse = await request.send();
				return {
					success: !response.isError,
					id: action.inviteId,
					accepted: action.accepted,
				};
			} catch (err) {
				return undefined;
			}
		}),
		mergeMap((result) => {
			if (result?.success) {
				return [
					<IAnswerInviteActionSuccess>{
						type: InvitesActionTypes.AnswerInviteSuccess,
						inviteId: result.id,
					},
					<IGetGroupsAction>{
						type: GroupsActionTypes.GetGroups,
					},
					<IGetInvitesAction>{
						type: InvitesActionTypes.GetInvites,
						userOnly: true,
					}
				];
			} else {
				toast.error(i18n.t("invites.answer.error"));
				return [
					<IAnswerInviteActionError>{
						type: InvitesActionTypes.AnswerInviteError,
						error: null,
					}
				];
			}
		}),
		catchError((err: Error) => {
			toast.error(i18n.t("invites.answer.errorCritical"));
			return of(<any>{
				type: InvitesActionTypes.AnswerInviteError,
				error: err,
			});
		})
	);

const getRidesEpic: Epic<RideAction> = (action$, state$) =>
	action$.pipe(
		ofType(RidesActionTypes.GetRides),
		switchMap(async (action: IGetRidesAction) => {
			const uid: string = (state$.value.auth as IAuthState).tokenInfo?.payload?.sub;
			const ownedRequest: GetRidesRequest = new GetRidesRequest({
				userId: uid,
				owned: true,
			});
			const participatedRequest: GetRidesRequest = new GetRidesRequest({
				userId: uid,
				participated: true,
			});
			const ownedPastRequest: GetRidesRequest = new GetRidesRequest({
				userId: uid,
				owned: true,
				past: true
			});
			const participatedPastRequest: GetRidesRequest = new GetRidesRequest({
				userId: uid,
				participated: true,
				past: true
			});
			try {
				const responseOwned: GetRidesResponse = await ownedRequest.send();
				const responseParticipated: GetRidesResponse = await participatedRequest.send();
				const responsePastOwned: GetRidesResponse = await ownedPastRequest.send();
				const responsePastParticipated: GetRidesResponse = await participatedPastRequest.send();
				let refreshAvailable: {
					refresh: boolean,
					groupId: string,
				} = null;
				if (action.refreshRidesAvailable && action.groupId) {
					refreshAvailable = {
						refresh: action.refreshRidesAvailable,
						groupId: action.groupId,
					};
				}
				return {
					owned: responseOwned.result,
					participated: responseParticipated.result,
					ownedPast: responsePastOwned.result,
					participatedPast: responsePastParticipated.result,
					refreshAvailable,
					filters: action.filters,
				};
			} catch (err) {
				return {
					err,
				};
			}
		}),
		mergeMap((response) => {
			if (response.err) {
				toast.error(i18n.t("rides.get.error"));
				return [<IGetRidesActionError>{
					type: RidesActionTypes.GetRidesError,
					error: response.err,
				}];
			} else {
				const result: RideAction[] = [
					<IGetRidesActionSuccess>{
						type: RidesActionTypes.GetRidesSuccess,
						ridesOwned: response.owned,
						ridesParticipated: response.participated,
						ridesOwnedPast: response.ownedPast,
						ridesParticipatedPast: response.participatedPast
					},
				];
				if (response.refreshAvailable?.refresh) {
					result.push(
						<IGetRidesAvailableAction>{
							type: RidesActionTypes.GetRidesAvailable,
							groupId: response.refreshAvailable.groupId,
							filters: response.filters,
						}
					);
				}
				return result;
			}
		}),
		catchError((err: Error) => {
			toast.error(i18n.t("rides.get.errorCritical"));
			return of(<any>{
				type: RidesActionTypes.GetRidesError,
				error: err,
			});
		})
	);

const getRidesAvailableEpic: Epic<GroupsAction | RideAction> = (action$, state$) => action$.pipe(
	ofType(RidesActionTypes.GetRidesAvailable),
	switchMap(async (action: IGetRidesAvailableAction) => {
		const uid: string = (state$.value.auth as IAuthState).tokenInfo?.payload?.sub;
		if (action.groupId) {
			const request: GetRidesRequest = new GetRidesRequest({
				userId: uid,
				groupId: action.groupId,
				dateTime: action.filters?.date ? moment(action.filters.date).toISOString() : null,
				direction: action.filters?.direction,
			});
			try {
				const response: GetRidesResponse = await request.send();
				const groupsState: IGroupsState = (state$.value.groups as IGroupsState);
				const rideIds: string[] = groupsState.ridesOwned.map(r => r.rideId);
				rideIds.push(...groupsState.ridesOwnedPast.map(r => r.rideId));
				rideIds.push(...groupsState.ridesParticipated.map(r => r.rideId));
				rideIds.push(...groupsState.ridesParticipatedPast.map(r => r.rideId));
				// highly ineffective code
				// todo: fix this
				return {
					error: response.isError ?? false,
					rides: response.result?.filter(r => !rideIds.includes(r.rideId)) ?? [],
				};
			} catch (err) {
				return {
					error: true,
					rides: [],
				};
			}
		} else {
			return {
				error: false,
				rides: [],
			};
		}
	}),
	mergeMap((response) => {
		if (response.error) {
			toast.error("rides.getAvailable.error");
			return [
				<IGetRidesAvailableActionError>{
					type: RidesActionTypes.GetRidesAvailableError,
					error: null,
				}
			];
		} else {
			return [
				<IGetRidesAvailableActionSuccess>{
					type: RidesActionTypes.GetRidesAvailableSuccess,
					rides: response.rides,
				},
			];
		}
	}),
	catchError((err: Error) => {
		toast.error("rides.getAvailable.errorCritical");
		return of(<IGetRidesAvailableActionError>{
			type: RidesActionTypes.GetRidesAvailableError,
			error: err,
		});
	})
);

const participateInRideEpic: Epic<RideAction> = (action$) =>
	action$.pipe(
		ofType(RidesActionTypes.ParticipateInRide),
		switchMap(async (action: IParticipateInRideAction) => {
			const request: AddRideRequestRequest = new AddRideRequestRequest({
				body: {
					rideId: action.ride.rideId,
					requestingUserId: getId(),
					rideOwnerId: action.ride.owner.id,
					location: action.location,
				}
			});
			try {
				const response: AddRideRequestResponse = await request.send();
				return {
					id: action.ride.rideId,
					groupId: action.ride.group.groupId,
					isError: response.isError ?? false,
					date: action.filters?.date,
				};
			} catch (err) {
				return undefined;
			}
		}),
		mergeMap(response => {
			if (response && !response.isError) {
				toast.success(i18n.t("ride.participate.success"));
				return [
					<IGetRidesAction>{
						type: RidesActionTypes.GetRides,
						userOnly: true,
						refreshRidesAvailable: true,
						groupId: response.groupId,
						date: response.date,
					},
					<IParticipateInRideActionSuccess>{
						type: RidesActionTypes.ParticipateInRideSuccess,
						rideId: response.id,
					},
				];
			} else {
				toast.error(i18n.t("ride.participate.error"));
				return [
					<IParticipateInRideActionError>{
						type: RidesActionTypes.ParticipateInRideError,
						error: null,
					}
				];
			}
		}),
		catchError((err: Error) => {
			toast.error(i18n.t("ride.participate.errorCritical"));
			return of(<any>{
				type: RidesActionTypes.ParticipateInRideError,
				error: err,
			});
		})
	);

const addRideEpic: Epic<RideAction | GenericAction> = (action$, state$) => action$.pipe(
	ofType(RidesActionTypes.AddRide),
	switchMap(async (action: IAddRideAction) => {
		const uid: string = (state$.value.auth as IAuthState).tokenInfo?.payload?.sub;
		let request: AddRideRequest;

		if (action.input.recurring) {
			const endDate = new Date(action.input.date);
			endDate.setDate(endDate.getDate() + action.input.numberOfWeeks * 7);

			const mappedDays = getMappedDays(action.input.weekDays);
			const rideTime = (action.input.date.getHours()) + ":" + action.input.date.getMinutes();

			request = new AddRideRequest({
				body: {
					rideDirection: action.input.rideDirection,
					weekDays: mappedDays,
					ownerId: uid,
					groupId: action.input.groupId,
					location: action.input.location,
					price: 0,
					seatsLimit: action.input.seatsLimit,
					rideTime,
					startDate: dateToIsoString(action.input.date),
					endDate: dateToIsoString(endDate)
				},
				recurring: action.input.recurring
			});
		} else {
			request = new AddRideRequest({
				body: {
					rideDirection: action.input.rideDirection,
					date: dateToIsoString(action.input.date),
					ownerId: uid,
					groupId: action.input.groupId,
					location: action.input.location,
					price: 0,
					seatsLimit: action.input.seatsLimit,
				},
				recurring: action.input.recurring,
			});
		}

		try {
			const response: AddRideResponse = await request.send();
			if (response.isError) {
				toast.error(i18n.t("ride.add.error"));
				return [
					<IAddRideErrorAction>{
						type: RidesActionTypes.AddRideError,
						error: null
					}
				];
			} else {
				toast.success(i18n.t("ride.add.success"));
				return [
					<IGetRidesAction>{
						type: RidesActionTypes.GetRides,
					},
					<IAddRideSuccessAction>{
						type: RidesActionTypes.AddRideSuccess,
					}
				];
			}
		} catch (err) {
			toast.error(i18n.t("ride.add.error"));
			return [
				<IAddRideErrorAction>{
					type: RidesActionTypes.AddRideError,
					error: err
				}
			];
		}
	}),
	mergeMap(res => res),
	catchError((err: Error) => {
		toast.error(i18n.t("ride.add.errorCritical"));
		return of(<any>{
			type: RidesActionTypes.ParticipateInRideError,
			error: err,
		});
	})
);

const addInviteEpic: Epic<InviteAction | GenericAction | LayoutAction> = (action$, state$) => action$.pipe(
	ofType(InvitesActionTypes.AddInvites),
	switchMap(async (action: IAddInvitesAction) => {
		const uid: string = (state$.value.auth as IAuthState).tokenInfo?.payload?.sub;
		try {
			action.userIds.forEach(id => {
				const request: AddInviteRequest = new AddInviteRequest({
					body: {
						groupId: action.groupId,
						inviterId: uid,
						invitedAppUserId: id,
					}
				});
				request.send().then(response => {
					if (response.isError) {
						throw "Error while inviting. Try again.";
					}
				});
			});
		} catch (e) {
			toast.error(i18n.t("invites.add.error"));
			return [<IApiErrorAction>{
				type: GenericActionTypes.ApiError,
				errorMessage: e,
			}];
		}
		toast.success(i18n.t("invites.add.success"));
		return [
			<IGetInvitesAction>{
				type: InvitesActionTypes.GetInvites,
				userOnly: true,
			},
			<IRedirectAction>{
				type: LayoutActionTypes.Redirect,
				to: "/" + mainRoutes.groups,
			}
		];
	}),
	mergeMap(res => res),
	catchError((err: Error) => {
		toast.error(i18n.t("invites.add.errorCritical"));
		return of(<any>{
		});
	})
);

const getGroupUsersEpic: Epic<GroupsAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.GetGroupUsers),
	switchMap(async (action: IGetGroupUsersAction) => {
		try {
			const req = new GetGroupUsersRequest(action.groupId);
			const res = await req.send();
			if (res.isError || res.status >= 300) {
				toast.error(i18n.t("groupUsers.get.error"));
				return [
					<IGetGroupUsersErrorAction>{
						type: GroupsActionTypes.GetGroupUsersError,
						error: null,
					},
				];
			} else {
				return [
					<IGetGroupUsersSuccessAction>{
						type: GroupsActionTypes.GetGroupUsersSuccess,
						users: res.result,
						groupId: action.groupId,
					}
				];
			}
		} catch (err) {
			toast.error(i18n.t("groupUsers.get.error"));
			return [
				<IGetGroupUsersErrorAction>{
					type: GroupsActionTypes.GetGroupUsersError,
					error: err,
				},
			];
		}
	}),
	mergeMap(res => res),
	catchError((err: Error) => {
		toast.error(i18n.t("groupUsers.get.errorCritical"));
		return of(<IGetGroupUsersErrorAction>{
			type: GroupsActionTypes.GetGroupUsersError,
			error: err,
		});
	})
);

const updateGroupDetailsEpic: Epic<GroupsAction> = (action$, state$) => action$.pipe(
	ofType(GroupsActionTypes.UpdateGroupDetails, GroupsActionTypes.SetSelectedGroup),
	filter((action: IUpdateGroupDetailsAction | ISetSelectedGroupAction) => {
		if (action.type === GroupsActionTypes.UpdateGroupDetails) {
			return (state$.value.groups as IGroupsState).groups.find(g => g.groupId === action.groupId)?.owner?.appUserId === getId();
		} else {
			return action.group?.owner?.appUserId === getId();
		}
	}),
	switchMap(async (action: IUpdateGroupDetailsAction | ISetSelectedGroupAction) => {
		try {
			const groupId = action.type === GroupsActionTypes.UpdateGroupDetails ? action.groupId : action.group.groupId;
			const req = new GetGroupDetailsRequest(groupId);
			const res = await req.send();
			const reqUsers = new GetGroupUsersRequest(groupId);
			const resUsers = await reqUsers.send();
			if (res.isError || res.status >= 300 || resUsers.isError || resUsers.status >= 300) {
				toast.error(i18n.t("group.detailsGet.error"));
				return [
					<IGetSelectedGroupDetailsErrorAction>{
						type: GroupsActionTypes.GetSelectedGroupDetailsError,
						error: null,
					},
				];
			} else {
				return [
					<IGetSelectedGroupDetailsSuccessAction>{
						type: GroupsActionTypes.GetSelectedGroupDetailsSuccess,
						group: {
							...res.result,
							users: resUsers.result,
						},
					}
				];
			}
		} catch (err) {
			toast.error(i18n.t("group.detailsGet.error"));
			return [
				<IGetSelectedGroupDetailsErrorAction>{
					type: GroupsActionTypes.GetSelectedGroupDetailsError,
					error: err,
				},
			];
		}
	}),
	mergeMap(res => res),
	catchError((err: Error) => {
		toast.error(i18n.t("group.detailsGet.errorCritical"));
		return of(<IGetSelectedGroupDetailsErrorAction>{
			type: GroupsActionTypes.GetSelectedGroupDetailsError,
			error: err,
		});
	})
);

const leaveGroupEpic: Epic<GroupsAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.LeaveGroup),
	switchMap(async (action: ILeaveGroupAction) => {
		try {
			const req = new DeleteUserFromGroupRequest({
				groupId: action.groupId,
				userId: getId(),
			});
			const res = await req.send();
			if (res.isError || res.status >= 300) {
				toast.error(i18n.t("group.leave.error"));
				return [
					<ILeaveGroupErrorAction>{
						type: GroupsActionTypes.LeaveGroupError,
						error: null,
					},
				];
			} else {
				toast.success(i18n.t("group.leave.success"));
				return [
					<ILeaveGroupSuccessAction>{
						type: GroupsActionTypes.LeaveGroupSuccess,
					}
				];
			}
		} catch (err) {
			toast.error(i18n.t("group.leave.error"));
			return [
				<ILeaveGroupErrorAction>{
					type: GroupsActionTypes.LeaveGroupError,
					error: err,
				},
			];
		}
	}),
	mergeMap(res => res),
	catchError((err: Error) => {
		toast.error(i18n.t("group.leave.errorCritical"));
		return of(<ILeaveGroupErrorAction>{
			type: GroupsActionTypes.LeaveGroupError,
			error: err,
		});
	})
);

const leftGroupEpic: Epic<GroupsAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.LeaveGroupSuccess),
	switchMap(() => [
		<IGetGroupsAction>{
			type: GroupsActionTypes.GetGroups,
		},
	]),
);

const deleteUserFromGroupEpic: Epic<GroupsAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.DeleteUserFromGroup),
	switchMap(async (action: IDeleteUserFromGroupAction) => {
		try {
			const req = new DeleteUserFromGroupRequest({
				groupId: action.groupId,
				userId: action.userId,
			});
			const res = await req.send();
			if (res.isError || res.status >= 300) {
				toast.error(i18n.t("group.deleteUser.error"));
				return [
					<IDeleteUserFromGroupErrorAction>{
						type: GroupsActionTypes.DeleteUserFromGroupError,
						error: null,
					},
				];
			} else {
				toast.success(i18n.t("group.deleteUser.success"));
				return [
					<IDeleteUserFromGroupSuccessAction>{
						type: GroupsActionTypes.DeleteUserFromGroupSuccess,
					},
					<IUpdateGroupDetailsAction>{
						type: GroupsActionTypes.UpdateGroupDetails,
						groupId: action.groupId,
					}
				];
			}
		} catch (err) {
			toast.error(i18n.t("group.deleteUser.error"));
			return [
				<IDeleteUserFromGroupErrorAction>{
					type: GroupsActionTypes.DeleteUserFromGroupError,
					error: err,
				},
			];
		}
	}),
	mergeMap(res => res),
	catchError((err: Error) => {
		toast.error(i18n.t("group.deleteUser.errorCritical"));
		return of(<IDeleteUserFromGroupErrorAction>{
			type: GroupsActionTypes.DeleteUserFromGroupError,
			error: err,
		});
	})
);

const deleteGroupEpic: Epic<GroupsAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.DeleteGroup),
	switchMap(async (action: IDeleteGroupAction) => {
		try {
			const req = new DeleteGroupRequest({
				groupId: action.groupId,
			});
			const res = await req.send();
			if (res.isError || res.status >= 300) {
				toast.error(i18n.t("group.delete.error"));
				return [
					<IDeleteGroupErrorAction>{
						type: GroupsActionTypes.DeleteGroupError,
						error: null,
					},
				];
			} else {
				toast.success(i18n.t("group.delete.success"));
				return [
					<IDeleteGroupSuccessAction>{
						type: GroupsActionTypes.DeleteGroupSuccess,
					},
					<IGetGroupsAction>{
						type: GroupsActionTypes.GetGroups,
					}
				];
			}
		} catch (err) {
			toast.error(i18n.t("group.delete.error"));
			return [
				<IDeleteGroupErrorAction>{
					type: GroupsActionTypes.DeleteGroupError,
					error: err,
				},
			];
		}
	}),
	mergeMap(res => res),
	catchError((err: Error) => {
		toast.error(i18n.t("group.delete.errorCritical"));
		return of(<IDeleteGroupErrorAction>{
			type: GroupsActionTypes.DeleteGroupError,
			error: err,
		});
	})
);

const editGroupEpic: Epic<GroupsAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.EditGroup),
	switchMap(async (action: IEditGroupAction) => {
		try {
			const req = new UpdateGroupRequest({
				groupId: action.groupId,
				body: {
					name: action.data.name,
					location: action.data.location,
				}
			});
			const res = await req.send();
			if (res.isError || res.status >= 300) {
				toast.error(i18n.t("group.edit.error"));
				return [
					<IEditGroupErrorAction>{
						type: GroupsActionTypes.EditGroupError,
						error: null,
					},
				];
			} else {
				toast.success(i18n.t("group.edit.success"));
				return [
					<IEditGroupSuccessAction>{
						type: GroupsActionTypes.EditGroupSuccess,
					},
				];
			}
		} catch (err) {
			toast.error(i18n.t("group.edit.error"));
			return [
				<IEditGroupErrorAction>{
					type: GroupsActionTypes.EditGroupError,
					error: err,
				},
			];
		}
	}),
	mergeMap(res => res),
	catchError((err: Error) => {
		toast.error(i18n.t("group.edit.errorCritical"));
		return of(<IEditGroupErrorAction>{
			type: GroupsActionTypes.EditGroupError,
			error: err,
		});
	})
);

const getGroupReportEpic: Epic<GroupsAction | LayoutAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.GetReport),
	switchMap(async (action: IGetReportAction) => {
		try {
			const startDate = moment(action.startDate).toISOString();

			const endDate = moment(action.endDate).toISOString();

			const req = new GetReportRequest({
				groupId: action.groupId,
				startDate,
				endDate,
			});
			const res = await req.send();
			if (res.isError || res.status >= 300) {
				toast.error(i18n.t("group.report.get.error"));
				return [
					<IGetReportActionError>{
						type: GroupsActionTypes.GetReportError,
						error: null,
					},
					<ISetLoaderVisibleAction>{
						type: LayoutActionTypes.SetLoaderVisible,
						visible: false,
					}
				];
			} else {
				return [
					<IGetReportActionSuccess>{
						type: GroupsActionTypes.GetReportSuccess,
						report: res.result,
					},
					<ISetLoaderVisibleAction>{
						type: LayoutActionTypes.SetLoaderVisible,
						visible: false,
					}
				];
			}
		} catch (err) {
			toast.error(i18n.t("group.report.get.error"));
			return [
				<IGetReportActionError>{
					type: GroupsActionTypes.GetReportError,
					error: err,
				},
				<ISetLoaderVisibleAction>{
					type: LayoutActionTypes.SetLoaderVisible,
					visible: false,
				}
			];
		}
	}),
	mergeMap(res => res),
	catchError(err => {
		toast.error(i18n.t("group.report.get.errorCritical"));
		return of(<IGetReportActionError>{
			type: GroupsActionTypes.GetReportError,
			error: err,
		});
	})
);

export const groupEpics = [
	addGroupEpic,
	getGroupsEpic,
	getInvitesEpic,
	answerInviteEpic,
	getRidesEpic,
	participateInRideEpic,
	addRideEpic,
	addInviteEpic,
	getRidesAvailableEpic,
	getGroupUsersEpic,
	leaveGroupEpic,
	leftGroupEpic,
	deleteUserFromGroupEpic,
	updateGroupDetailsEpic,
	deleteGroupEpic,
	editGroupEpic,
	getGroupReportEpic,
];

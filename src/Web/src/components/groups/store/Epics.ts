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
	IGetReportAction,
	IGetReportActionError,
	IGetReportActionSuccess
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
import { getId } from "../../../helpers/UniversalHelper";
import { IAuthState } from "../../auth/store/State";
import { AddRideRequest } from "../api/addRide/AddRideRequest";
import { AddRideResponse } from "../api/addRide/AddRideResponse";
import { AddInviteRequest } from "../api/addInvite/AddInviteRequest";
import { IRedirectAction, LayoutAction, LayoutActionTypes } from "../../layout/store/Types";
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

const answerInviteEpic: Epic<InviteAction | GroupsAction> = (action$) =>
	action$.pipe(
		ofType(InvitesActionTypes.AnswerInvite),
		switchMap(async (action: IAnswerInviteAction) => {
			const request: AnswerInviteRequest = new AnswerInviteRequest({
				groupInviteId: action.inviteId,
				isAccepted: action.accepted
			});
			const response: AnswerInviteResponse = await request.send();
			return {
				success: !response.isError,
				id: action.inviteId,
			};
		}),
		mergeMap((result) => {
			if (result.success) {
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
			};
		}),
		mergeMap((response) => {
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
					}
				);
			}
			return result;
		}),
		catchError((err: Error) =>
			of(<any>{
				type: RidesActionTypes.GetRidesError,
				error: err,
			})
		)
	);

const getRidesAvailableEpic: Epic<GroupsAction | RideAction> = (action$, state$) => action$.pipe(
	ofType(RidesActionTypes.GetRidesAvailable),
	switchMap(async (action: IGetRidesAvailableAction) => {
		const uid: string = (state$.value.auth as IAuthState).tokenInfo?.payload?.sub;
		if (action.groupId) {
			const request: GetRidesRequest = new GetRidesRequest({
				userId: uid,
				groupId: action.groupId,
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
	catchError((err: Error) =>
		of(<IGetRidesAvailableActionError>{
			type: RidesActionTypes.GetRidesAvailableError,
			error: err,
		})
	)
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
			const response: AddRideRequestResponse = await request.send();
			return {
				id: action.ride.rideId,
				groupId: action.ride.group.groupId,
				isError: response.isError ?? false,
			};
		}),
		mergeMap(response => {
			if (!response.isError) {
				toast.success("Succesfully participated in ride!");
				return [
					<IGetRidesAction>{
						type: RidesActionTypes.GetRides,
						userOnly: true,
						refreshRidesAvailable: true,
						groupId: response.groupId,
					},
					<IParticipateInRideActionSuccess>{
						type: RidesActionTypes.ParticipateInRideSuccess,
						rideId: response.id,
					},
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

const addRideEpic: Epic<RideAction | GenericAction> = (action$, state$) => action$.pipe(
	ofType(RidesActionTypes.AddRide),
	switchMap(async (action: IAddRideAction) => {
		const uid: string = (state$.value.auth as IAuthState).tokenInfo?.payload?.sub;
		let weekdays: number = 0;
		if (action.input.weekDays.all) {
			weekdays = 1111111;
		} else {
			if (action.input.weekDays.monday) {
				weekdays += 1;
			}
			if (action.input.weekDays.tuesday) {
				weekdays += 10;
			}
			if (action.input.weekDays.wednesday) {
				weekdays += 100;
			}
			if (action.input.weekDays.thursday) {
				weekdays += 1000;
			}
			if (action.input.weekDays.friday) {
				weekdays += 10000;
			}
			if (action.input.weekDays.saturday) {
				weekdays += 100000;
			}
			if (action.input.weekDays.sunday) {
				weekdays += 1000000;
			}
		}
		const mappedDays: number = parseInt(weekdays.toString(), 2);
		let request: AddRideRequest;

		// TODO zastanowić się czy planujemy dać użytkownikowi wybór tego
		const currentDate = new Date();
		const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
		// END

		if (action.input.recurring) {
			request = new AddRideRequest({
				body: {
					rideDirection: action.input.rideDirection,
					weekDays: mappedDays,
					ownerId: uid,
					groupId: action.input.groupId,
					location: action.input.location,
					price: 0,
					seatsLimit: action.input.seatsLimit,
					rideTime: (action.input.date.getHours() + ":" + action.input.date.getMinutes()),
					startDate: currentDate.toISOString(),
					endDate: nextMonthDate.toISOString()
				},
				recurring: action.input.recurring
			});
		} else {
			request = new AddRideRequest({
				body: {
					rideDirection: action.input.rideDirection,
					date: action.input.date.toISOString(),
					ownerId: uid,
					groupId: action.input.groupId,
					location: action.input.location,
					price: 0,
					seatsLimit: action.input.seatsLimit,
				},
				recurring: action.input.recurring,
			});
		}

		const response: AddRideResponse = await request.send();
		if (response.isError) {
			return <IApiErrorAction>{
				type: GenericActionTypes.ApiError,
				errorMessage: "Error while adding ride. Try again."
			};
		} else {
			return <IGetRidesAction>{
				type: RidesActionTypes.GetRides,
			};
		}
	}),
	mergeMap(res => [res]),
);

const addInviteEpic: Epic<InviteAction | GenericAction | LayoutAction> = (action$, state$) => action$.pipe(
	ofType(InvitesActionTypes.AddInvites),
	mergeMap(async (action: IAddInvitesAction) => {
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
			return [<IApiErrorAction>{
				type: GenericActionTypes.ApiError,
				errorMessage: e,
			}];
		}
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
	switchMap(res => res)
);

const getGroupUsersEpic: Epic<GroupsAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.GetGroupUsers),
	switchMap(async (action: IGetGroupUsersAction) => {
		try {
			const req = new GetGroupUsersRequest(action.groupId);
			const res = await req.send();
			if (res.isError || res.status >= 300) {
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
			return [
				<IGetGroupUsersErrorAction>{
					type: GroupsActionTypes.GetGroupUsersError,
					error: err,
				},
			];
		}
	}),
	mergeMap(res => res)
);

const updateGroupDetailsEpic: Epic<GroupsAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.UpdateGroupDetails, GroupsActionTypes.SetSelectedGroup),
	switchMap(async (action: IUpdateGroupDetailsAction | ISetSelectedGroupAction) => {
		try {
			const groupId = action.type === GroupsActionTypes.UpdateGroupDetails ? action.groupId : action.group.groupId;
			const req = new GetGroupDetailsRequest(groupId);
			const res = await req.send();
			const reqUsers = new GetGroupUsersRequest(groupId);
			const resUsers = await reqUsers.send();
			if (res.isError || res.status >= 300 || resUsers.isError || resUsers.status >= 300) {
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
			return [
				<IGetSelectedGroupDetailsErrorAction>{
					type: GroupsActionTypes.GetSelectedGroupDetailsError,
					error: err,
				},
			];
		}
	}),
	mergeMap(res => res),
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
				return [
					<ILeaveGroupErrorAction>{
						type: GroupsActionTypes.LeaveGroupError,
						error: null,
					},
				];
			} else {
				return [
					<ILeaveGroupSuccessAction>{
						type: GroupsActionTypes.LeaveGroupSuccess,
					}
				];
			}
		} catch (err) {
			return [
				<ILeaveGroupErrorAction>{
					type: GroupsActionTypes.LeaveGroupError,
					error: err,
				},
			];
		}
	}),
	mergeMap(res => res),
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
				return [
					<IDeleteUserFromGroupErrorAction>{
						type: GroupsActionTypes.DeleteUserFromGroupError,
						error: null,
					},
				];
			} else {
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
			return [
				<IDeleteUserFromGroupErrorAction>{
					type: GroupsActionTypes.DeleteUserFromGroupError,
					error: err,
				},
			];
		}
	}),
	mergeMap(res => res),
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
				return [
					<IDeleteGroupErrorAction>{
						type: GroupsActionTypes.DeleteGroupError,
						error: null,
					},
				];
			} else {
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
			return [
				<IDeleteGroupErrorAction>{
					type: GroupsActionTypes.DeleteGroupError,
					error: err,
				},
			];
		}
	}),
	mergeMap(res => res),
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

const getGroupReportEpic: Epic<GroupsAction> = (action$) => action$.pipe(
	ofType(GroupsActionTypes.GetReport),
	switchMap(async (action: IGetReportAction) => {
		try {
			const req = new GetReportRequest(action.groupId);
			const res = await req.send();
			if (res.isError || res.status >= 300) {
				toast.error(i18n.t("group.report.get.error"));
				return [
					<IGetReportActionError>{
						type: GroupsActionTypes.GetReportError,
						error: null,
					},
				];
			} else {
				return [
					<IGetReportActionSuccess>{
						type: GroupsActionTypes.GetReportSuccess,
						report: res.result,
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
	apiErrorEpic,
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

import { IGroup } from "../interfaces/IGroup";
import {
	IAddGroupAction,
	IGetGroupsAction,
	IGetInvitesAction,
	IAnswerInviteAction,
	IGetRidesAction,
	IParticipateInRideAction,
	IAddRideAction,
	IAddInvitesAction,
	ISetSelectedGroupAction,
	IGetRidesAvailableAction,
	IGetGroupUsersAction,
	ISetLoadingStatusAction
} from "./Types";
import { addGroup, getGroups, getInvites, answerInvite, getRides, participateInRide, addRide, addInvites, setSelectedGroup, getRidesAvailable, getGroupUsers, setLoadingStatus } from "./Actions";
import { IGroupsState } from "./State";
import { IInvite } from "../interfaces/IInvite";
import { IRide } from "../interfaces/IRide";
import { IAuthState } from "../../auth/store/State";
import { IAddRideInput } from "../../rides/components/addRide/interfaces/IAddRideInput";
import { ILocation } from "../interfaces/ILocation";
import { IAddGroupData } from "../interfaces/IAddGroupData";
import { RideDirection } from "../api/addRide/AddRideRequest";
import { IRideFilters } from "../interfaces/IRideFilters";
import { LoadingStatus } from "../../shared/enum/LoadingStatus";
interface IStatePropsType {
	groups: IGroupsState;
	auth: IAuthState;
}

interface IStateFromProps {
	groups: IGroup[];
	invites: IInvite[];
	ridesOwned: IRide[];
	ridesParticipated: IRide[];
	ridesOwnedPast: IRide[];
	ridesParticipatedPast: IRide[];
	ridesAvailable: IRide[];
	authId: string;
	loadingStatus: LoadingStatus;
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	groups: state.groups.groups,
	invites: state.groups.invites,
	ridesOwned: state.groups.ridesOwned,
	ridesParticipated: state.groups.ridesParticipated,
	ridesOwnedPast: state.groups.ridesOwnedPast,
	ridesParticipatedPast: state.groups.ridesParticipatedPast,
	ridesAvailable: state.groups.ridesAvailable,
	authId: state.auth.tokenInfo?.payload?.sub,
	loadingStatus: state.groups.loadingStatus,
});

interface IDispatchPropsType {
	setLoadingStatus: (loadingStatus: LoadingStatus) => ISetLoadingStatusAction;
	addGroup: (group: IAddGroupData) => IAddGroupAction;
	addRide: (input: IAddRideInput) => IAddRideAction;
	addInvites: (groupId: string, userIds: string[]) => IAddInvitesAction;
	getGroups: () => IGetGroupsAction;
	getInvites: (userOnly: boolean) => IGetInvitesAction;
	answerInvite: (accepted: boolean, inviteId: string) => IAnswerInviteAction;
	getRides: (refreshRidesAvailable?: boolean, groupId?: string, filters?: IRideFilters) => IGetRidesAction;
	participateInRide: (ride: IRide, location: ILocation, filters?: IRideFilters) => IParticipateInRideAction;
	getRidesAvailable: (groupId: string, filters?: IRideFilters) => IGetRidesAvailableAction;
	setSelectedGroup: (group: IGroup) => ISetSelectedGroupAction;
	getGroupUsers: (groupId: string) => IGetGroupUsersAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	setLoadingStatus,
	addGroup,
	getGroups,
	getInvites,
	answerInvite,
	getRides,
	participateInRide,
	addRide,
	addInvites,
	setSelectedGroup,
	getRidesAvailable,
	getGroupUsers,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;

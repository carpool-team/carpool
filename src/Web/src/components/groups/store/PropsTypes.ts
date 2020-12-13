import { IGroup } from "../interfaces/IGroup";
import { IAddGroupAction, IGetGroupsAction, IGetInvitesAction, IAnswerInviteAction, IGetRidesAction, IParticipateInRideAction, IAddRideAction } from "./Types";
import { addGroup, getGroups, getInvites, answerInvite, getRides, participateInRide, addRide } from "./Actions";
import { IGroupsState } from "./State";
import { IInvite } from "../interfaces/IInvite";
import { IRide } from "../interfaces/IRide";
import { IAuthState } from "../../auth/store/State";
import { IAddRideInput } from "../../rides/addRide/interfaces/IAddRideInput";
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
	authId: string;
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	groups: state.groups.groups,
	invites: state.groups.invites,
	ridesOwned: state.groups.ridesOwned,
	ridesParticipated: state.groups.ridesParticipated,
	ridesOwnedPast: state.groups.ridesOwnedPast,
	ridesParticipatedPast: state.groups.ridesParticipatedPast,
	authId: state.auth.tokenInfo?.payload?.jti,
});

interface IDispatchPropsType {
	addGroup: (group: IGroup) => IAddGroupAction;
	getGroups: (userOnly: boolean) => IGetGroupsAction;
	getInvites: (userOnly: boolean) => IGetInvitesAction;
	answerInvite: (accepted: boolean, inviteId: string) => IAnswerInviteAction;
	getRides: (userOnly: boolean) => IGetRidesAction;
	participateInRide: (rideId: string) => IParticipateInRideAction;
	addRide: (input: IAddRideInput) => IAddRideAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	addGroup,
	getGroups,
	getInvites,
	answerInvite,
	getRides,
	participateInRide,
	addRide,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;

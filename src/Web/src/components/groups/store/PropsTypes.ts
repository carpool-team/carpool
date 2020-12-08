import { IGroup } from "../interfaces/IGroup";
import { IAddGroupAction, IGetGroupsAction, IGetInvitesAction, IAnswerInviteAction, IGetRidesAction, IParticipateInRideAction } from "./Types";
import { addGroup, getGroups, getInvites, answerInvite, getRides, participateInRide } from "./Actions";
import { IGroupsState } from "./State";
import { IInvite } from "../interfaces/IInvite";
import { IRide } from "../interfaces/IRide";
import { IAuthState } from "../../auth/store/State";

interface IStatePropsType {
	groups: IGroupsState;
	auth: IAuthState;
}

interface IStateFromProps {
	groups: IGroup[];
	invites: IInvite[];
	rides: IRide[];
	authId: string;
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	groups: state.groups.groups,
	invites: state.groups.invites,
	rides: state.groups.rides,
	authId: state.auth.tokenInfo?.payload?.jti,
});

interface IDispatchPropsType {
	addGroup: (group: IGroup) => IAddGroupAction;
	getGroups: (userOnly: boolean) => IGetGroupsAction;
	getInvites: (userOnly: boolean) => IGetInvitesAction;
	answerInvite: (accepted: boolean, inviteId: string) => IAnswerInviteAction;
	getRides: (userOnly: boolean) => IGetRidesAction;
	participateInRide: (rideId: string) => IParticipateInRideAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	addGroup,
	getGroups,
	getInvites,
	answerInvite,
	getRides,
	participateInRide,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;

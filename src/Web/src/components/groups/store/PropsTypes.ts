import { IGroup } from "../interfaces/IGroup";
import { IAddGroupAction, IGetGroupsAction, IGetInvitesAction, IAnswerInviteAction, IGetRidesAction } from "./Types";
import { addGroup, getGroups, getInvites, answerInvite, getRides, } from "./Actions";
import { IGroupsState } from "./State";
import { IInvite } from "../interfaces/IInvite";
import { IRide } from "../interfaces/IRide";

interface IStatePropsType {
	groups: IGroupsState;
}

interface IStateFromProps {
	groups: IGroup[];
	invites: IInvite[];
	rides: IRide[];
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	groups: state.groups.groups,
	invites: state.groups.invites,
	rides: state.groups.rides,
});

interface IDispatchPropsType {
	addGroup: (group: IGroup) => IAddGroupAction;
	getGroups: (userOnly: boolean) => IGetGroupsAction;
	getInvites: (userOnly: boolean) => IGetInvitesAction;
	answerInvite: (accepted: boolean, inviteId: string) => IAnswerInviteAction;
	getRides: (userOnly: boolean) => IGetRidesAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	addGroup,
	getGroups,
	getInvites,
	answerInvite,
	getRides,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;
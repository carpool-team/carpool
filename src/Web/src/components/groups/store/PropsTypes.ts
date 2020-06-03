import { IGroup } from "../interfaces/IGroup";
import { IAddGroupAction, IGetGroupsAction, IGetInvitesAction } from "./Types";
import { addGroup, getGroups, getInvites, } from "./Actions";
import { IGroupsState } from "./State";
import { IInvite } from "../interfaces/IInvite";

interface IStatePropsType {
	groups: IGroupsState;
}

interface IStateFromProps {
	groups: IGroup[];
	invites: IInvite[];
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	groups: state.groups.groups,
	invites: state.groups.invites,
});

interface IDispatchPropsType {
	addGroup: (group: IGroup) => IAddGroupAction;
	getGroups: (userOnly: boolean) => IGetGroupsAction;
	getInvites: (invitesOnly: boolean) => IGetInvitesAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	addGroup,
	getGroups,
	getInvites,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;
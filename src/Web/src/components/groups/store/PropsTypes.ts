import { IGroup } from "../interfaces/IGroup";
import { IAddGroupAction, IGetGroupsAction } from "./Types";
import { addGroup, getGroups, } from "./Actions";
import { IGroupsState } from "./State";

interface IStatePropsType {
	groups: IGroupsState;
}

interface IStateFromProps {
	groups: IGroup[];
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	groups: state.groups.groups,
});

interface IDispatchPropsType {
	addGroup: (group: IGroup) => IAddGroupAction;
	getGroups: (userOnly: boolean) => IGetGroupsAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	addGroup,
	getGroups,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;
import { IGroup } from "../interfaces/IGroup";
import { IAddGroupAction } from "./Types";
import { addGroup } from "./Actions";
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
	groupsAddGroup: (group: IGroup) => IAddGroupAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	groupsAddGroup: addGroup,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;
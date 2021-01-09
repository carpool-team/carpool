import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { IGroup } from "../../../interfaces/IGroup";
import { IParticipant } from "../../../interfaces/IParticipant";
import { getGroupUsers } from "../../../store/Actions";
import { IGroupsState } from "../../../store/State";
import { IGetGroupUsersAction } from "../../../store/Types";

interface IStatePropsType {
	groups: IGroupsState;
}

interface IStateToProps {
	users: IParticipant;
}

const mapStateToProps: (state: IStatePropsType) => IStateToProps = state => ({
	users: state.groups.groups[0].userCount as any as IParticipant
});

interface IDispatchPropsType {
	getGroupUsers: (groupId: string) => IGetGroupUsersAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	getGroupUsers,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;

interface IUsersGroupProps extends IReactI18nProps, DispatchProps, StateProps {
	group: IGroup;
}

const UsersGroupForm: (props: IUsersGroupProps) => JSX.Element = props => {
	useEffect(() => {
		props.getGroupUsers(props.group.groupId);
	}, []);

	const { t } = props;

	return (
		<div>
			{props.group.name}
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withTranslation()(UsersGroupForm)
);

import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { IGroup } from "../../../interfaces/IGroup";
import { IParticipant } from "../../../interfaces/IParticipant";
import { getGroupUsers } from "../../../store/Actions";
import { IGroupsState } from "../../../store/State";
import { IGetGroupUsersAction } from "../../../store/Types";

interface IDispatchPropsType {
	getGroupUsers: (groupId: string) => IGetGroupUsersAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	getGroupUsers,
};

export type DispatchProps = typeof mapDispatchToProps;
interface IUsersGroupProps extends IReactI18nProps, DispatchProps {
	group: IGroup;
}

const UsersGroupForm: (props: IUsersGroupProps) => JSX.Element = props => {
	useEffect(() => {
		props.getGroupUsers(props.group.groupId);
	}, []);

	// userzy w props.group.users po pobraniu
	useEffect(() => {
		console.log(props.group?.users);
	}, [props.group?.users]);

	const { t } = props;

	return (
		<div>
			{props.group.name}
		</div>
	);
};

export default connect(null, mapDispatchToProps)(
	withTranslation()(UsersGroupForm)
);

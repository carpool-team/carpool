import React from "react";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { IGroup } from "../../../interfaces/IGroup";


interface IUsersGroupProps extends IReactI18nProps {
	group: IGroup;
}

const UsersGroupForm: (props: IUsersGroupProps) => JSX.Element = props => {


	const { t } = props;

	return (
		<div>
			{props.group.name}
		</div>
	);
};

export default withTranslation()(UsersGroupForm);

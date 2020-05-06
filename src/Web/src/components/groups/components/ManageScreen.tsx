import React, { Component } from "react";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import GroupsRouter from "./GroupsRouter";

interface IManageScreenProps extends IReactI18nProps, RouteComponentProps { }

class ManageScreen extends Component<IManageScreenProps> {
	private resources = {
		addGroupBtn: "groups.addGroupBtn"
	};

	render() {
		const { t } = this.props;
		const { url } = this.props.match;
		return (
			<div>
				<Link to={`${url}${GroupsRouter.routes.addGroup}`}>
					{t(this.resources.addGroupBtn)}
				</Link>
			</div>
		);
	}
}

export default withTranslation()(withRouter(ManageScreen));

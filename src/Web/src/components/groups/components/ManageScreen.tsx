import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import GroupsRouter from "./GroupsRouter";
import { IGroupCallbacks } from "../interfaces/IGroupCallbacks";

interface IManageScreenProps extends IReactI18nProps, RouteComponentProps {
	callbacks: IGroupCallbacks;
}

class ManageScreen extends Component<IManageScreenProps> {
	private resources = {
		addGroupBtn: "groups.addGroupBtn"
	};

	renderGroupsList = () => {
		return this.props.callbacks.getGroups().map(group => {
			return (
				<div>
					{group.name}
				</div>
			);
		});
	}

	render() {
		const { t } = this.props;
		const { url } = this.props.match;
		return (
			<div>
				{this.renderGroupsList()}
				<Link to={`${url}${GroupsRouter.routes.addGroup}`}>
					{t(this.resources.addGroupBtn)}
				</Link>
			</div>
		);
	}
}

export default withTranslation()(withRouter(ManageScreen));

import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import MediaQuery from "react-responsive";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import GroupsRouter from "./GroupsRouter";
import { IGroupCallbacks } from "../interfaces/IGroupCallbacks";
import { ButtonSize } from "../../ui/Button/enums/ButtonSize";
import { ButtonType } from "../../ui/Button/enums/ButtonType";
import { ButtonShape } from "../../ui/Button/enums/ButtonShape";
import ButtonLink from "../../ui/Button/ButtonLink";
import Button from "../../ui/Button/Button";
import ButtonCheckBox from "../../ui/Button/ButtonCheckBox";

import mapImage from "assets_path/img/loadingMap.png";

interface IManageScreenProps extends IReactI18nProps, RouteComponentProps {
	callbacks: IGroupCallbacks;
}

class ManageScreen extends Component<IManageScreenProps> {
	private resources = {
		addGroupBtn: "groups.addGroupBtn",
		groupsBtn: "groups.groupsBtn",
		ridesBtn: "groups.ridesBtn",
	};

	private cssClasses = {
		container: "groupsManagement",
		listPanel: "groupsManagement__listPanel",
		map: "groupsManagement__map",
		buttonsPanel: "groupList__buttons",
		list: "groupList__list",
	};

	renderGroupsList = () => {
		return (
			<ul className={this.cssClasses.list}>
				{this.props.callbacks.getGroups().map((group) => {
					return (
						<li key={group.name}>
							<ButtonCheckBox
								size={ButtonSize.Standard}
								type={ButtonType.Standard}
								shape={ButtonShape.Circle}
								label={group.name}
							></ButtonCheckBox>
						</li>
					);
				})}
			</ul>
		);
	}

	renderGroups = () => {
		const { t } = this.props;
		const { url } = this.props.match;

		return (
			<div className={this.cssClasses.listPanel}>
				<div className={this.cssClasses.buttonsPanel}>
					<Button size={ButtonSize.Standard} type={ButtonType.Info}>
						{t(this.resources.groupsBtn)}
					</Button>
					<Button size={ButtonSize.Standard} type={ButtonType.Success}>
						{t(this.resources.ridesBtn)}
					</Button>
				</div>
				<hr />
				{this.renderGroupsList()}
				<hr />
				<div className={this.cssClasses.buttonsPanel}>
					<ButtonLink
						size={ButtonSize.Standard}
						type={ButtonType.Standard}
						to={`${url}${GroupsRouter.routes.addGroup}`}
					>
						{t(this.resources.addGroupBtn)}
					</ButtonLink>
				</div>
			</div>
		);
	}

	render() {
		return (
			<>
				<div className={this.cssClasses.container}>
					{this.renderGroups()}
					<MediaQuery query="(min-width: 900px)">
						<div className={this.cssClasses.map}>
							<img src={mapImage} alt={""} />
						</div>
					</MediaQuery>
				</div>
			</>
		);
	}
}

export default withTranslation()(withRouter(ManageScreen));

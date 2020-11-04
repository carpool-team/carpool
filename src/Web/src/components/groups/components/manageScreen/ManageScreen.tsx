import React, { Component } from "react";
import produce from "immer";
import { withTranslation } from "react-i18next";
import MediaQuery from "react-responsive";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import GroupsRouter from "../GroupsRouter";
import { IGroupCallbacks } from "../../interfaces/IGroupCallbacks";
import { ButtonSize } from "../../../ui/_oldButton/enums/ButtonSize";
import { ButtonType } from "../../../ui/_oldButton/enums/ButtonType";
import ButtonLink from "../../../ui/_oldButton/ButtonLink";
import Button from "../../../ui/_oldButton/Button";
import GroupsList from "./components/GroupsList";
import InvitesList from "./components/InvitesList";
import RidesList from "./components/RidesList";

import mapImage from "assets_path/img/loadingMap.png";

enum Lists {
	Invites = "INVITES",
	Groups = "GROUPS",
	Rides = "RIDES",
}

interface IManageScreenProps extends IReactI18nProps, RouteComponentProps {
	callbacks: IGroupCallbacks;
}

interface IManageScreenState {
	selectedScreen: Lists;
}

class ManageScreen extends Component<IManageScreenProps, IManageScreenState> {
	private resources = {
		addGroupBtn: "groups.addGroupBtn",
		groupsBtn: "groups.groupsBtn",
		ridesBtn: "groups.ridesBtn",
		invitesBtn: "groups.invitesBtn",
	};

	private cssClasses = {
		container: "groupsManagement",
		listPanel: "groupsManagement__listPanel",
		map: "groupsManagement__map",
		buttonsPanel: "groupList__buttons",
		list: "groupList__list",
	};

	constructor(props: IManageScreenProps) {
		super(props);
		this.state = {
			selectedScreen: Lists.Groups
		};
	}

	setCurrentList = (list: Lists) => {
		this.setState(produce((draft: IManageScreenState) => {
			draft.selectedScreen = list;
		}));
	}

	renderInvitesList = () => (
		<InvitesList
			answerInviteCallback={this.props.callbacks.answerInvite}
			getInvitesCallback={this.props.callbacks.getInvites}
		/>
	)

	renderGroupsList = () => (
		<GroupsList
			getGroupsCallback={this.props.callbacks.getGroups}
			setGroupChecked={this.props.callbacks.setGroupSelected}
		/>
	)

	renderRidesList = () => (
		<RidesList
			getRidesCallback={this.props.callbacks.getRides}
			participateCallback={this.props.callbacks.participateInRide}
		/>
	)

	renderGroups = () => {
		const { t } = this.props;
		const { url } = this.props.match;

		let list: JSX.Element;

		switch (this.state.selectedScreen) {
			case Lists.Invites:
				list = this.renderInvitesList();
				break;
			case Lists.Rides:
				list = this.renderRidesList();
				break;
			case Lists.Groups:
			default:
				list = this.renderGroupsList();
				break;
		}

		return (
			<div className={this.cssClasses.listPanel}>
				<div className={this.cssClasses.buttonsPanel}>
					<Button size={ButtonSize.Standard} type={ButtonType.Info} onClick={() => this.setCurrentList(Lists.Groups)}>
						{t(this.resources.groupsBtn)}
					</Button>
					<Button size={ButtonSize.Standard} type={ButtonType.Success} onClick={() => this.setCurrentList(Lists.Rides)}>
						{t(this.resources.ridesBtn)}
					</Button>
					<Button size={ButtonSize.Standard} type={ButtonType.Standard} onClick={() => this.setCurrentList(Lists.Invites)}>
						{t(this.resources.invitesBtn)}
					</Button>
				</div>
				<hr />
				{list}
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

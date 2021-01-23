import React, { Component } from "react";
import produce from "immer";
import MapBoxGroups from "../../../map/MapBoxGroups";
import MapBoxInvites from "../../../map/MapBoxInvites";
import { withTranslation } from "react-i18next";
import MediaQuery from "react-responsive";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import GroupsRouter from "../GroupsRouter";
import Button from "../../../ui/button/Button";
import { ButtonColor } from "../../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../../ui/button/enums/ButtonBackground";
import ButtonLink from "../../../ui/buttonLink/ButtonLink";
import { ButtonLinkColor } from "../../../ui/buttonLink/enums/ButtonLinkColor";
import { ButtonLinkBackground } from "../../../ui/buttonLink/enums/ButtonLinkBackground";
import { ButtonLinkStyle } from "../../../ui/buttonLink/enums/ButtonLinkStyle";
import { IGroupCallbacks } from "../../interfaces/IGroupCallbacks";
import GroupsList from "./components/groupsList/GroupsList";
import InvitesList from "./components/InvitesList";
import { IGroup } from "../../interfaces/IGroup";
import { IInvite } from "../../interfaces/IInvite";

enum Lists {
	Invites = "INVITES",
	Groups = "GROUPS",
}

interface IManageScreenProps extends IReactI18nProps, RouteComponentProps {
	callbacks: IGroupCallbacks;
	selectedGroup: IGroup;
}

interface IManageScreenState {
	selectedScreen: Lists;
	selectedGroup: IGroup;
	selectedInvite: IInvite;
}

class ManageScreen extends Component<IManageScreenProps, IManageScreenState> {
	private resources = {
		addGroupBtn: "groups.addGroupBtn",
		groupsBtn: "common.groups",
		invitesBtn: "groups.invitesBtn",
	};

	private cssClasses = {
		container: "groupsManagement",
		listContainer: "groupsManagementListContainer",
		buttonsContainer: "groupsManagementButtonsContainer",
		buttonsOutline: "groupsManagementButtonsContainer--outline",
		buttonActive: "groupsManagementButtonActive",
		mapBox: "groupsManagementMapBox",
		listWraper: "groupsManagementList__wraper"
	};

	private ids = {
		groupsBtn: "groupsBtn",
		invitesBtn: "invitesBtn",
	};

	constructor(props: IManageScreenProps) {
		super(props);
		this.state = {
			selectedGroup: null,
			selectedInvite: null,
			selectedScreen: Lists.Groups
		};
	}

	setCurrentList = (list: Lists) => {
		if (list !== this.state.selectedScreen) {
			let groupsBtn = document.getElementById(this.ids.groupsBtn);
			groupsBtn?.classList.toggle(this.cssClasses.buttonActive);
			let invitesBtn = document.getElementById(this.ids.invitesBtn);
			invitesBtn?.classList.toggle(this.cssClasses.buttonActive);
		}
		this.setState(produce((draft: IManageScreenState) => {
			draft.selectedScreen = list;
		}));
	}

	setCurrentInvite = (invite: IInvite) => {
		if (this.state.selectedInvite !== invite) {
			this.setState(
				produce((draft: IManageScreenState) => {
					draft.selectedInvite = invite;
				})
			);
		} else {
			this.setState(
				produce((draft: IManageScreenState) => {
					draft.selectedInvite = null;
				})
			);
		}
	}

	renderInvitesList = () => (
		<InvitesList
			answerInviteCallback={this.props.callbacks.answerInvite}
			getInvitesCallback={this.props.callbacks.getInvites}
			setInviteSelected={this.setCurrentInvite}
		/>
	)

	renderGroupsList = () => (
		<GroupsList
			getGroupsCallback={this.props.callbacks.getGroups}
			setGroupSelected={this.props.callbacks.setGroupSelected}
			groupSelected={this.props.selectedGroup}
		/>
	)

	renderGroupsMap = () => (
		<MapBoxGroups
			getGroupsCallback={this.props.callbacks.getGroups}
			setSelectedGroupCallback={this.props.callbacks.setGroupSelected}
			group={this.props.selectedGroup}
		/>
	)

	renderInvitesMap = () => (
		<MapBoxInvites
			getInvitesCallback={this.props.callbacks.getInvites}
			setSelectedInviteCallback={this.setCurrentInvite}
			invite={this.state.selectedInvite}
		/>
	)

	renderLeftPanel = () => {
		const { t } = this.props;
		const { url } = this.props.match;

		let list: JSX.Element;

		switch (this.state.selectedScreen) {
			case Lists.Invites:
				list = this.renderInvitesList();
				break;
			case Lists.Groups:
			default:
				list = this.renderGroupsList();
				break;
		}

		return (
			<div className={this.cssClasses.listContainer}>
				<div className={this.cssClasses.buttonsContainer}>
					<Button id={this.ids.groupsBtn} background={ButtonBackground.Gray} className={this.cssClasses.buttonActive} color={ButtonColor.Gray} onClick={() => this.setCurrentList(Lists.Groups)}>
						{t(this.resources.groupsBtn)}
					</Button>
					<Button id={this.ids.invitesBtn} background={ButtonBackground.Gray} color={ButtonColor.Gray} onClick={() => this.setCurrentList(Lists.Invites)}>
						{t(this.resources.invitesBtn)}
					</Button>
					<ButtonLink
						style={ButtonLinkStyle.Button}
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
						to={`${url}${GroupsRouter.routes.addGroup}`}
					>
						{t(this.resources.addGroupBtn)}
					</ButtonLink>
				</div>
				<div className={this.cssClasses.buttonsOutline}></div>
				<div className={this.cssClasses.listWraper}>
					{list}
				</div>
			</div>
		);
	}

	renderRightPanel = () => {
		let map: JSX.Element;

		switch (this.state.selectedScreen) {
			case Lists.Invites:
				map = this.renderInvitesMap();
				break;
			case Lists.Groups:
			default:
				map = this.renderGroupsMap();
				break;
		}

		return (
			<MediaQuery query="(min-width: 900px)">
				<div className={this.cssClasses.mapBox}>
					{map}
				</div>
			</MediaQuery>
		);
	}

	render() {
		return (
			<>
				<div className={this.cssClasses.container}>
					{this.renderLeftPanel()}
					{this.renderRightPanel()}
				</div>
			</>
		);
	}
}

export default withTranslation()(withRouter(ManageScreen));

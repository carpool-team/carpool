import React, { Component } from "react";
import { connect } from "react-redux";
import GroupsRouter from "./components/GroupsRouter";
import { withRouter, RouteComponentProps } from "react-router";
import { IGroupCallbacks } from "./interfaces/IGroupCallbacks";

import {
	StateProps,
	DispatchProps,
	mapStateToProps,
	mapDispatchToProps,
} from "./store/PropsTypes";
import produce from "immer";

import "./Groups.scss";
import { LoadingStatus } from "../shared/enum/LoadingStatus";

interface IGroupsProps extends RouteComponentProps, StateProps, DispatchProps { }

interface IGroupsState {
	selectedGroupId: string;
}

class Groups extends Component<IGroupsProps, IGroupsState> {
	private cssClasses = {
		container: "groupsContainer",
	};

	constructor(props: IGroupsProps) {
		super(props);
		this.state = {
			selectedGroupId: null,
		};
		this.props.setLoadingStatus(LoadingStatus.Loading);
		this.props.getGroups();
		this.props.getInvites(true);
		this.props.getRides(false);
	}

	getGroupsHandler = () => {
		return this.props.groups ?? [];
	}

	getInvitesHandler = () => this.props.invites ?? [];

	getRidesHandler = (owned: boolean) => {
		return (owned ? this.props.ridesOwned : this.props.ridesParticipated) ?? [];
	}

	setSelectedGroupHandler = (id: string) => {
		if (id) {
			this.props.setLoadingStatus(LoadingStatus.Loading);
			this.props.getRidesAvailable(id);
		}
		this.setState(produce((draft: IGroupsState) => {
			draft.selectedGroupId = id ?? null;
		}));
		this.props.setSelectedGroup(id ? this.props.groups.find(g => g.groupId === id) : null);
	}

	render() {
		let callbacks: IGroupCallbacks = {
			addGroup: this.props.addGroup,
			getGroups: this.getGroupsHandler,
			getInvites: this.getInvitesHandler,
			answerInvite: (answer, id) => this.props.answerInvite(answer, id),
			redirect: (route) => this.props.history.push(route),
			getRides: this.getRidesHandler,
			participateInRide: this.props.participateInRide,
			setGroupSelected: (id) => this.setSelectedGroupHandler(id),
			addRide: this.props.addRide,
			addInvites: this.props.addInvites,
			getRidesAvailable: () => this.props.ridesAvailable,
		};

		return (
			<section className={this.cssClasses.container}>
				<GroupsRouter
					match={this.props.match}
					staticContext={this.props.staticContext}
					history={this.props.history}
					location={this.props.location}
					callbacks={callbacks}
					selectedGroup={this.state.selectedGroupId ? this.props.groups.find(g => g.groupId === this.state.selectedGroupId) : null}
					authId={this.props.authId}
					loadingStatus={this.props.loadingStatus}
				/>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));

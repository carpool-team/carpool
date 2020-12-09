import React, { Component } from "react";
import { connect } from "react-redux";
import GroupsRouter from "./components/GroupsRouter";
import { withRouter, RouteComponentProps } from "react-router";
import { IGroupCallbacks } from "./interfaces/IGroupCallbacks";
import { IGroup } from "./interfaces/IGroup";

import {
	StateProps,
	DispatchProps,
	mapStateToProps,
	mapDispatchToProps,
} from "./store/PropsTypes";
import produce from "immer";

import "./Groups.scss";
import { IAddRideInput } from "./components/addRideForm/interfaces/IAddRideInput";

interface IGroupsProps extends RouteComponentProps, StateProps, DispatchProps { }

interface IGroupsState {
	selectedGroup: IGroup;
}
class Groups extends Component<IGroupsProps, IGroupsState> {
	private cssClasses = {
		container: "groupsContainer",
	};

	constructor(props: IGroupsProps) {
		super(props);
		this.state = {
			selectedGroup: undefined,
		};
		this.props.getGroups(false);
		this.props.getInvites(true);
		this.props.getRides(false);
	}

	/** Handles adding group */
	addGroupHandler = (group: IGroup) => {
		this.props.addGroup(group);
	}

	getGroupsHandler = () => {
		return this.props.groups ?? [];
	}

	getInvitesHandler = () => this.props.invites ?? [];

	getRidesHandler = (owned: boolean) => {
		return (owned ? this.props.ridesOwned : this.props.ridesParticipated) ?? [];
		// .filter(r => r.group?.id === this.state.selectedGroup.id && (!r.isUserParticipant || r.owner.userId === this.props.authId));
	}

	setSelectedGroupHandler = (id: number) => {
		this.setState(produce((draft: IGroupsState) => {
			draft.selectedGroup = this.getGroupsHandler().find(g => g.id === id);
		}));
	}

	render() {
		let callbacks: IGroupCallbacks = {
			addGroup: this.addGroupHandler,
			getGroups: this.getGroupsHandler,
			getInvites: this.getInvitesHandler,
			answerInvite: (answer, id) => this.props.answerInvite(answer, id),
			redirect: (route) => this.props.history.push(route),
			getRides: this.getRidesHandler,
			participateInRide: this.props.participateInRide,
			setGroupSelected: (id) => this.setSelectedGroupHandler(id),
			addRide: (input: IAddRideInput) => this.props.addRide(input),
		};

		return (
			<section className={this.cssClasses.container}>
				<GroupsRouter
					match={this.props.match}
					staticContext={this.props.staticContext}
					history={this.props.history}
					location={this.props.location}
					callbacks={callbacks}
					selectedGroup={this.state.selectedGroup}
					authId={this.props.authId}
				/>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));

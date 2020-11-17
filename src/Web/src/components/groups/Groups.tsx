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

import "./Groups.scss";
import { tempUserId } from "../../api/requests/RequestCore";
import produce from "immer";

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

	getGroupsHandler = () => this.props.groups;

	getInvitesHandler = () => this.props.invites;

	getRidesHandler = () => {
		return this.props.rides.filter(r => r.group?.id === this.state.selectedGroup.id && (!r.isUserParticipant || r.owner.userId === tempUserId));
	}

	setSelectedGroupHandler = (id: string) => {
		this.setState(produce((draft: IGroupsState) => {
			draft.selectedGroup = this.props.groups.find(g => g.id === id);
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
				/>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));

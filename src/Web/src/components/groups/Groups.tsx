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

interface IGroupsProps extends RouteComponentProps, StateProps, DispatchProps { }

class Groups extends Component<IGroupsProps> {
	private cssClasses = {
		container: "groupsContainer",
	};

	constructor(props: IGroupsProps) {
		super(props);
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
		let groupIds: string[] = this.props.groups.filter(g => g.selected).map(g => g.id);
		return this.props.rides.filter(r => groupIds.includes(r.group?.id) && (!r.isUserParticipant || r.owner.userId === tempUserId));
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
			setGroupSelected: (id, unselectOthers) => this.props.setGroupSelected(id, unselectOthers),
		};

		return (
			<section className={this.cssClasses.container}>
				<GroupsRouter
					match={this.props.match}
					staticContext={this.props.staticContext}
					history={this.props.history}
					location={this.props.location}
					callbacks={callbacks}
					selectedGroupId={this.props.groups.find(g => g.selected)?.id}
				/>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));

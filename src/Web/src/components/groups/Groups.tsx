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

interface IGroupsProps extends RouteComponentProps, StateProps, DispatchProps { }

class Groups extends Component<IGroupsProps> {
	private cssClasses = {
		container: "groupsContainer",
	};

	constructor(props: IGroupsProps) {
		super(props);
		this.props.getGroups(true);
		this.props.getInvites(true);
		this.props.getRides(true);
	}

	/** Handles adding group */
	addGroupHandler = (group: IGroup) => {
		this.props.addGroup(group);
	}

	getGroupsHandler = () => this.props.groups;

	getInvitesHandler = () => this.props.invites;

	getRidesHandler = () => this.props.rides;

	render() {
		let callbacks: IGroupCallbacks = {
			addGroup: this.addGroupHandler,
			getGroups: this.getGroupsHandler,
			getInvites: this.getInvitesHandler,
			answerInvite: (answer, id) => this.props.answerInvite(answer, id),
			redirect: (route) => this.props.history.push(route),
			getRides: this.getRidesHandler,
		};

		return (
			<section className={this.cssClasses.container}>
				<GroupsRouter
					match={this.props.match}
					staticContext={this.props.staticContext}
					history={this.props.history}
					location={this.props.location}
					callbacks={callbacks}
				/>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));

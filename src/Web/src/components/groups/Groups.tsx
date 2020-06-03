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
		this.props.getGroups(false);
		this.props.getInvites(false);
	}

	/** Handles adding group */
	addGroupHandler = (group: IGroup) => {
		this.props.addGroup(group);
	}

	getGroupsHandler = () => this.props.groups;

	getInvitesHandler = () => this.props.invites;

	render() {
		let callbacks: IGroupCallbacks = {
			addGroup: this.addGroupHandler,
			getGroups: this.getGroupsHandler,
			getInvites: this.getInvitesHandler,
			redirect: (route) => this.props.history.push(route),
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

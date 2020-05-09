import React, { Component } from "react";
import { connect } from "react-redux";
import GroupsRouter from "./components/GroupsRouter";
import { withRouter, RouteComponentProps } from "react-router";
import { IGroupCallbacks } from "./interfaces/IGroupCallbacks";
import { IGroup } from "./interfaces/IGroup";
import { StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from "./store/PropsTypes";

import "./Groups.scss";

interface IGroupsProps extends RouteComponentProps, StateProps, DispatchProps { }

class Groups extends Component<IGroupsProps> {
	private cssClasses = {
		container: "groupsContainer",
	};

	/** Handles adding group */
	addGroupHandler = (group: IGroup) => {
		this.props.groupsAddGroup(group);
	}

	/** Gets groups */
	getGroupsHandler = () => this.props.groups;

	render() {
		let callbacks: IGroupCallbacks = {
			addGroup: this.addGroupHandler,
			getGroups: this.getGroupsHandler,
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

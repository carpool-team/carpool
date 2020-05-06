import React, { Component } from "react";
import { produce } from "immer";
import GroupsRouter from "./components/GroupsRouter";
import { withRouter, RouteComponentProps } from "react-router";
import { IGroupCallbacks } from "./interfaces/IGroupCallbacks";
import { IGroup } from "./interfaces/IGroup";

import "./Groups.scss";

interface IGroupsProps extends RouteComponentProps { }

interface IGroupsState {
	groups: IGroup[];
}

class Groups extends Component<IGroupsProps, IGroupsState> {
	private cssClasses = {
		container: "groupsContainer",
	};

	constructor(props: IGroupsProps) {
		super(props);
		this.state = {
			groups: [
				{
					name: "Testowa grupa 1",
					users: []
				},
				{
					name: "Testowa grupa 2",
					users: []
				}
			]
		};
	}

	/** Handles adding group */
	addGroupHandler = (group: IGroup) => {
		this.setState(produce((draft: IGroupsState) => {
			draft.groups.push(group);
		}));
	}

	/** Gets groups */
	getGroupsHandler = () => this.state.groups;

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

export default withRouter(Groups);

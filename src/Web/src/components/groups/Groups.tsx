import React, { Component } from "react";
import GroupsRouter from "./components/GroupsRouter";
import { withRouter, RouteComponentProps } from "react-router";
import { IGroupCallbacks } from "./interfaces/IGroupCallbacks";
import { produce } from "immer";
import { IGroup } from "./interfaces/IGroup";

interface IGroupsProps extends RouteComponentProps { }

interface IGroupsState {
	groups: IGroup[];
}

class Groups extends Component<IGroupsProps, IGroupsState> {
	constructor(props: IGroupsProps) {
		super(props);
		this.state = {
			groups: []
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
			<GroupsRouter
				match={this.props.match}
				staticContext={this.props.staticContext}
				history={this.props.history}
				location={this.props.location}
				callbacks={callbacks}
			/>
		);
	}
}

export default withRouter(Groups);

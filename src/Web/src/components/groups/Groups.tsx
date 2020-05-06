import React, { Component } from "react";
import GroupsRouter from "./components/GroupsRouter";
import { withRouter, RouteComponentProps } from "react-router";

interface IGroupsProps extends RouteComponentProps { }

class Groups extends Component<IGroupsProps> {
	render() {
		return (
			<GroupsRouter
				match={this.props.match}
				staticContext={this.props.staticContext}
				history={this.props.history}
				location={this.props.location}
			/>
		);
	}
}

export default withRouter(Groups);

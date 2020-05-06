import React, { Component, Suspense } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { LoaderSpinner } from "../../ui/loaderSpinner/LoaderSpinner";
import ManageScreen from "./ManageScreen";
import AddGroupFormScreen from "./AddGroupFormScreen";
import { IGroupCallbacks } from "../interfaces/IGroupCallbacks";

interface IGroupsRouterProps extends RouteComponentProps {
	callbacks: IGroupCallbacks;
}

class GroupsRouter extends Component<IGroupsRouterProps> {
	public static routes = {
		addGroup: "add/",
	};

	render = () => {
		const { path } = this.props.match;
		return (
			<Suspense fallback={<LoaderSpinner />}>
				<Switch>
					<Route exact path={path}>
						<ManageScreen
							callbacks={this.props.callbacks}
						/>
					</Route>
					<Route path={path + GroupsRouter.routes.addGroup}>
						<AddGroupFormScreen
							callbacks={this.props.callbacks}
						/>
					</Route>
				</Switch>
			</Suspense >
		);
	}
}

export default GroupsRouter;
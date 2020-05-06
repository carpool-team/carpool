import React, { Component, Suspense } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { LoaderSpinner } from "../../ui/loaderSpinner/LoaderSpinner";
import ManageScreen from "./ManageScreen";
import AddGroupFormScreen from "./AddGroupFormScreen";

class GroupsRouter extends Component<RouteComponentProps> {
	public static routes = {
		addGroup: "add/",
	};

	render = () => {
		const { path } = this.props.match;
		return (
			<Suspense fallback={<LoaderSpinner />}>
				<Switch>
					<Route exact path={path} component={ManageScreen} />
					<Route path={path + GroupsRouter.routes.addGroup} component={AddGroupFormScreen} />
				</Switch>
			</Suspense >
		);
	}
}

export default GroupsRouter;
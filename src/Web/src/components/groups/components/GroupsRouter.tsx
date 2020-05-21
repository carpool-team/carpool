import React, { Component, Suspense } from "react";
import ManageScreen from "./ManageScreen";
import AddGroupForm from "./addGroupForm/AddGroupForm";
import { Switch, Route, RouteComponentProps } from "react-router";
import { LoaderSpinner } from "../../ui/loaderSpinner/LoaderSpinner";
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
						<ManageScreen callbacks={this.props.callbacks} />
					</Route>
					<Route path={path + GroupsRouter.routes.addGroup}>
						<AddGroupForm callbacks={this.props.callbacks} />
					</Route>
				</Switch>
			</Suspense >
		);
	}
}

export default GroupsRouter;
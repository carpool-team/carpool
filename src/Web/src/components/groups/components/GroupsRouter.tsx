import React, { Component, Suspense } from "react";
import ManageScreen from "./manageScreen/ManageScreen";
import AddGroupForm from "./addGroupForm/AddGroupForm";
import { Switch, Route, RouteComponentProps } from "react-router";
import { LoaderSpinner } from "../../ui/loaderSpinner/LoaderSpinner";
import { IGroupCallbacks } from "../interfaces/IGroupCallbacks";
import GroupInvite from "./invite/GroupInvite";
import GroupEdit from "./edit/GroupEdit";
import GroupRides from "./rides/GroupRides";

interface IGroupsRouterProps extends RouteComponentProps {
	callbacks: IGroupCallbacks;
	selectedGroupId?: string;
}

class GroupsRouter extends Component<IGroupsRouterProps> {
	public static routes = {
		addGroup: "add/",
		rides: "rides/",
		edit: "edit/",
		invite: "invite/",
	};

	render = () => {
		const { path } = this.props.match;
		return (
			<Suspense fallback={<LoaderSpinner />}>
				<Switch>
					<Route exact path={path}>
						<ManageScreen
							callbacks={this.props.callbacks}
						//  selectedGroupId={this.props.selectedGroupId}
						/>
					</Route>
					<Route path={path + GroupsRouter.routes.addGroup}>
						<AddGroupForm callbacks={this.props.callbacks} />
					</Route>
					{this.props.selectedGroupId ?
						<>
							<Route path={path + GroupsRouter.routes.edit}>
								<GroupEdit selectedGroupId={this.props.selectedGroupId} />
							</Route>

						</> : null}
				</Switch>
			</Suspense >
		);
	}
}

export default GroupsRouter;

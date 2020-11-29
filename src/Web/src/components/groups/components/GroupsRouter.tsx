import React, { Component, Suspense } from "react";
import ManageScreen from "./manageScreen/ManageScreen";
import AddGroupForm from "./addGroupForm/AddGroupForm";
import { Switch, Route, RouteComponentProps } from "react-router";
import { LoaderSpinner } from "../../ui/loaderSpinner/LoaderSpinner";
import { IGroupCallbacks } from "../interfaces/IGroupCallbacks";
import GroupInvite from "./invite/GroupInvite";
import GroupEdit from "./edit/GroupEdit";
import GroupRides from "./rides/GroupRides";
import AddRideForm from "./addRideForm/AddRideForm";
import { IGroup } from "../interfaces/IGroup";
import AddRideFormScreen from "./addRideForm/AddRideForm";

interface IGroupsRouterProps extends RouteComponentProps {
	callbacks: IGroupCallbacks;
	selectedGroup: IGroup;
}

class GroupsRouter extends Component<IGroupsRouterProps> {
	public static routes = {
		addGroup: "add/",
		rides: "rides/",
		edit: "edit/",
		invite: "invite/",
		addRide: "add/"
	};

	render = () => {
		const { path } = this.props.match;
		return (
			<Suspense fallback={<LoaderSpinner />}>
				<Switch>
					<Route exact path={path}>
						<ManageScreen
							callbacks={this.props.callbacks}
							selectedGroup={this.props.selectedGroup}
						/>
					</Route>
					<Route path={path + GroupsRouter.routes.addGroup}>
						<AddGroupForm callbacks={this.props.callbacks} />
					</Route>
					{this.props.selectedGroup ?
						<>
							<Route path={path + GroupsRouter.routes.edit}>
								<GroupEdit group={this.props.selectedGroup} />
							</Route>
							<Route path={path + GroupsRouter.routes.invite}>
								<GroupInvite group={this.props.selectedGroup} />
							</Route>
							<Route exact path={path + GroupsRouter.routes.rides}>
								<GroupRides group={this.props.selectedGroup} />
							</Route>
							<Route  path={path + GroupsRouter.routes.rides + GroupsRouter.routes.addRide}>
								<AddRideFormScreen />
							</Route>
						</> : null}
				</Switch>
			</Suspense >
		);
	}
}

export default GroupsRouter;

import React, { Component, Suspense } from "react";
import ManageScreen from "./manageScreen/ManageScreen";
import AddGroupForm from "./addGroupForm/AddGroupForm";
import { Switch, Route, RouteComponentProps } from "react-router";
import LoaderSpinner from "../../ui/loaderSpinner/LoaderSpinner";
import { IGroupCallbacks } from "../interfaces/IGroupCallbacks";
import GroupInvite from "./invite/GroupInvite";
import GroupEdit from "./edit/GroupEdit";
import GroupRides from "./rides/GroupRides";
import { IGroup } from "../interfaces/IGroup";
import { IRide } from "../interfaces/IRide";

interface IGroupsRouterProps extends RouteComponentProps {
	callbacks: IGroupCallbacks;
	selectedGroup: IGroup;
	authId: string;
}

class GroupsRouter extends Component<IGroupsRouterProps> {
	public static routes = {
		addGroup: "add/",
		rides: "rides/",
		edit: "edit/",
		invite: "invite/",
		addRide: "add/",
	};

	render = () => {
		const { path } = this.props.match;
		let rides: IRide[] = [];
		if (this.props.selectedGroup) {
			const selGroupId: string = this.props.selectedGroup.groupId.toString();
			const ridesOwned: IRide[] = this.props.callbacks
				.getRides(true)
				.filter((r) => r.group.groupId === selGroupId);
			const ridesParticipated: IRide[] = this.props.callbacks
				.getRides(false)
				.filter((r) => r.group.groupId === selGroupId);
			rides = [...ridesOwned, ...ridesParticipated];
		}
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
						<AddGroupForm
							callbacks={this.props.callbacks}
							userId={this.props.authId}
						/>
					</Route>
					{this.props.selectedGroup ? (
						<>
							<Route path={path + GroupsRouter.routes.edit}>
								<GroupEdit group={this.props.selectedGroup} rides={rides} />
							</Route>
							<Route path={path + GroupsRouter.routes.invite}>
								<GroupInvite
									group={this.props.selectedGroup}
									rides={rides}
									onConfirm={(_users) => { }}
									currentAppUserId={this.props.authId}
								/>
							</Route>
							<Route exact path={path + GroupsRouter.routes.rides}>
								<GroupRides group={this.props.selectedGroup} rides={rides} />
							</Route>
						</>
					) : null}
				</Switch>
			</Suspense>
		);
	}
}

export default GroupsRouter;

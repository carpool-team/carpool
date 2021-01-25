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
import FallbackRoute from "../../system/FallbackRoute";
import GroupUsers from "./users/GroupUsers";
import GroupReport from "./reports/GroupReports";
import { LoadingStatus } from "../../shared/enum/LoadingStatus";

interface IGroupsRouterProps extends RouteComponentProps {
	callbacks: IGroupCallbacks;
	selectedGroup: IGroup;
	authId: string;
	loadingStatus: LoadingStatus;
}

class GroupsRouter extends Component<IGroupsRouterProps> {
	public static routes = {
		addGroup: "add/",
		rides: "rides/",
		edit: "edit/",
		invite: "invite/",
		addRide: "add/",
		users: "users/",
		report: "report/"
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
		const ridesAvailable: IRide[] = this.props.callbacks.getRidesAvailable();
		return (
			<Suspense fallback={<LoaderSpinner />}>
				<Switch>
					<Route exact path={path}>
						<ManageScreen
							callbacks={this.props.callbacks}
							selectedGroup={this.props.selectedGroup}
							loadingStatus={this.props.loadingStatus}
						/>
					</Route>
					<Route path={path + GroupsRouter.routes.addGroup}>
						<AddGroupForm
							callbacks={this.props.callbacks}
							userId={this.props.authId}
							loadingStatus={this.props.loadingStatus}
						/>
					</Route>
					{this.props.selectedGroup ? (
						<>
							<Route path={path + GroupsRouter.routes.users}>
								<GroupUsers group={this.props.selectedGroup} rides={rides} loadingStatus={this.props.loadingStatus} />
							</Route>
							<Route path={path + GroupsRouter.routes.report}>
								<GroupReport group={this.props.selectedGroup} rides={rides} loadingStatus={this.props.loadingStatus} />
							</Route>
							<Route path={path + GroupsRouter.routes.edit}>
								<GroupEdit group={this.props.selectedGroup} rides={rides} loadingStatus={this.props.loadingStatus} />
							</Route>
							<Route path={path + GroupsRouter.routes.invite}>
								<GroupInvite
									group={this.props.selectedGroup}
									rides={rides}
									addInvitesCallback={(groupId, userIds) => this.props.callbacks.addInvites(groupId, userIds)}
									currentAppUserId={this.props.authId}
									loadingStatus={this.props.loadingStatus}
								/>
							</Route>
							<Route exact path={path + GroupsRouter.routes.rides}>
								<GroupRides
									group={this.props.selectedGroup}
									rides={ridesAvailable}
									joinRideCallback={this.props.callbacks.participateInRide}
									loadingStatus={this.props.loadingStatus}
								/>
							</Route>
						</>
					) : null}
					<FallbackRoute to={path} />
				</Switch>
			</Suspense>
		);
	}
}

export default GroupsRouter;

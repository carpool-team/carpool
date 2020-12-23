import React, { Component, Suspense } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import LoaderSpinner from "../ui/loaderSpinner/LoaderSpinner";
import Rides from "./rides/Rides";
import AddRide from "./addRide/AddRide";
import FallbackRoute from "../system/FallbackRoute";

interface IGroupsRouterProps extends RouteComponentProps {
	authId: string;
}
export const rideRoutes = {
	addRide: "addRide/"
};

class RidesRouter extends Component<IGroupsRouterProps> {

	render = () => {
		const { path } = this.props.match;
		console.log(path + rideRoutes.addRide);
		return (
			<Suspense fallback={<LoaderSpinner />}>
				<Switch>
					<Route exact path={path}>
						<Rides />
					</Route>
					<Route path={path + rideRoutes.addRide}>
						<AddRide />
					</Route>
					<FallbackRoute />
				</Switch>
			</Suspense >
		);
	}
}

export default RidesRouter;

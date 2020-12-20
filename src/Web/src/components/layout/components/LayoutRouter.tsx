import React, { Suspense } from "react";
import { Switch, Route, RouteComponentProps, withRouter } from "react-router";
import HomeScreen from "../../homeScreen/HomeScreen";
import LoaderSpinner from "../../ui/loaderSpinner/LoaderSpinner";
import Groups from "../../groups/Groups";
import LoginPanel from "../../auth/login/LoginPanel";
import RegisterPanel from "../../auth/register/RegisterPanel";
import RidesRouter from "../../rides/RidesRouter";
import PrivateRoute from "../../system/PrivateRoute";
import HelpForm from "../../helpForm/HelpForm";
import UserProfile from "../../auth/userProfile/UserProfile";
import FallbackRoute from "../../system/FallbackRoute";

export const mainRoutes = {
	groups: "groups/",
	default: "",
	register: "register/",
	login: "login/",
	rides: "rides/",
	help: "help/",
	profile: "profile/"
};

const LayoutRouter = (props: RouteComponentProps) => {
	const { path } = props.match;
	return (
		<Suspense fallback={<LoaderSpinner />}>
			<Switch>
				<Route exact path={path} component={HomeScreen} />
				<PrivateRoute path={path + mainRoutes.groups} component={Groups} />
				<Route exact path={path + mainRoutes.register} component={RegisterPanel} />
				<Route exact path={path + mainRoutes.login} component={LoginPanel} />
				<PrivateRoute path={path + mainRoutes.rides} component={RidesRouter} />
				<Route exact path={path + mainRoutes.help} component={HelpForm} />
				<PrivateRoute path={path + mainRoutes.profile} component={UserProfile} />
				<FallbackRoute />
			</Switch>
		</Suspense>
	);
};

export default withRouter(LayoutRouter);

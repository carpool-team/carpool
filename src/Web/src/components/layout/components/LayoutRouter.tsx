import React, { Component, Suspense } from "react";
import { Switch, Route, RouteComponentProps, withRouter } from "react-router";
import HomeScreen from "../../homeScreen/HomeScreen";
import { LoaderSpinner } from "../../ui/loaderSpinner/LoaderSpinner";
import Groups from "../../groups/Groups";
import LoginPanel from "../../auth/login/LoginPanel";
import RegisterPanel from "../../auth/register/RegisterPanel";

export const mainRoutes = {
	groups: "groups/",
	default: "",
	register: "register/",
	login: "login/",
};

const LayoutRouter = (props: RouteComponentProps) => {
	const { path } = props.match;
	return (
		<Suspense fallback={<LoaderSpinner />}>
			<Switch>
				<Route exact path={path} component={HomeScreen} />
				<Route path={path + mainRoutes.groups} component={Groups} />
				<Route exact path={path + mainRoutes.register} component={RegisterPanel} />
				<Route exact path={path + mainRoutes.login} component={LoginPanel} />
			</Switch>
		</Suspense>
	);
};

export default withRouter(LayoutRouter);

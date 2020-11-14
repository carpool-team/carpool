import React, { Component, Suspense } from "react";
import { Switch, Route, RouteComponentProps, withRouter } from "react-router";
import { LoaderSpinner } from "../ui/loaderSpinner/LoaderSpinner";
import LoginPanel from "./login/LoginPanel";
import RegisterPanel from "./register/RegisterPanel";

export const AuthRoutes = {
	register: "register/",
	login: "login/",
	main: "auth/",
};

interface IAuthRouterProps extends RouteComponentProps { }

const AuthRouter = (props: IAuthRouterProps) => {
	const { path } = props.match;
	return (
		<Suspense fallback={<LoaderSpinner />}>
			<Switch>
				<Route exact path={path + AuthRoutes.register}>
					<RegisterPanel />
				</Route>
				<Route exact path={path + AuthRoutes.login}>
					<LoginPanel />
				</Route>
			</Switch>
		</Suspense >
	);
};

export default withRouter(AuthRouter);

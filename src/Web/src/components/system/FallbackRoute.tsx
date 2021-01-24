import React from "react";
import { Redirect, Route } from "react-router";
import App from "../../App";

interface IFallbackRouteProps {
	to?: string;
}

const FallbackRoute = (props: IFallbackRouteProps) => (
	<Route>
		<Redirect to={props.to ?? App.rootRoute} />
	</Route>
);

export default FallbackRoute;

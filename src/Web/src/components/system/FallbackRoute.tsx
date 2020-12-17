import React from "react";
import { Redirect, Route } from "react-router";
import App from "../../App";

const FallbackRoute = () => (
	<Route>
		<Redirect to={App.rootRoute} />
	</Route>
);

export default FallbackRoute;

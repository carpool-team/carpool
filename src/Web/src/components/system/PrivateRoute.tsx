import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { isAuthorized } from "../../helpers/UniversalHelper";
import { mainRoutes } from "../layout/components/LayoutRouter";

class PrivateRoute<T extends RouteProps> extends React.Component<T>{
	render(): JSX.Element {
		if (isAuthorized() === false) {
			return (
				<Redirect
					to={`/${mainRoutes.login}`}
				/>
			);
		} else {
			return (
				<Route
					{...this.props}
				/>
			)
		}
	}
}

export default PrivateRoute;

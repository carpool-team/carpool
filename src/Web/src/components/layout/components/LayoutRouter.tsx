import React, { Component, Suspense } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import LoadingScreen from "../../loadingScreen/LoadingScreen";

class LayoutRouter extends Component<RouteComponentProps> {
	private routes = {
		main: ""
	};

	private cssClasses = {
		main: "main"
	};

	render = () => {
		const url: string = this.props.match.url;
		return (
			<main className={this.cssClasses.main}>
				<Suspense fallback={"Load"}>
					<Switch>
						<Route path={this.routes.main} component={LoadingScreen} />
						<Route path={url + this.routes.main} component={LoadingScreen} />
					</Switch>
				</Suspense>
			</main>
		);
	}
}

export default LayoutRouter;
import React, { Component, Suspense } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";

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
						<Route path={this.routes.main} />
						<Route path={url + this.routes.main} />
					</Switch>
				</Suspense>
			</main>
		);
	}
}

export default LayoutRouter;
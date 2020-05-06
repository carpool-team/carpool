import React, { Component, Suspense } from "react";
import { Switch, Route, RouteComponentProps, withRouter } from "react-router";
import LoadingScreen from "../../loadingScreen/LoadingScreen";
import { LoaderSpinner } from "../../ui/loaderSpinner/LoaderSpinner";
import Groups from "../../groups/Groups";

class LayoutRouter extends Component<RouteComponentProps> {
	static routes = {
		groups: "groups/",
	};

	private cssClasses = {
		main: "main"
	};

	render = () => {
		const { path } = this.props.match;
		return (
			<main className={this.cssClasses.main}>
				<Suspense fallback={<LoaderSpinner />}>
					<Switch>
						<Route exact path={path} component={LoadingScreen} />
						<Route path={path + LayoutRouter.routes.groups} component={Groups} />
					</Switch>
				</Suspense>
			</main>
		);
	}
}

export default LayoutRouter;
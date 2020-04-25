import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import Hello from "./components/hello/Hello";
import { LoaderSpinner } from "./components/ui/loaderSpinner/LoaderSpinner";

export default class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Router>
					<BreadcrumbsProvider>
						<Suspense fallback={<LoaderSpinner />}>
							<Switch>
								<Route path={"/"}>
									<Hello />
								</Route>
							</Switch>
						</Suspense>
					</BreadcrumbsProvider>
				</Router>
			</React.Fragment>
		);
	}
}

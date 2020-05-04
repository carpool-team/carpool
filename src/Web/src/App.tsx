import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { LoaderSpinner } from "./components/ui/loaderSpinner/LoaderSpinner";
import { NavBar } from "./components/NavBar/NavBar";
import Layout from "./components/layout/Layout";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

export default class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Router>
					<BreadcrumbsProvider>
						<Suspense fallback={<LoaderSpinner />}>
							<Switch>
								<Route path={"/"} component={LoadingScreen} />
           					</Switch>
						</Suspense>
					</BreadcrumbsProvider>
				</Router>
			</React.Fragment>
		);
	}
}

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import Layout from "./components/layout/Layout";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <BreadcrumbsProvider>
            <Switch>
              <Route path={"/"} component={LoadingScreen} />
            </Switch>
          </BreadcrumbsProvider>
        </Router>
      </React.Fragment>
    );
  }
}

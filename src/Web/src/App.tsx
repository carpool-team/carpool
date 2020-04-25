import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
//import { Hello } from "./components/Hello/Hello";
import { NavBar } from "./components/NavBar/NavBar";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <BreadcrumbsProvider>
            <Switch>
              <Route path={"/"}>
                <NavBar />
              </Route>
            </Switch>
          </BreadcrumbsProvider>
        </Router>
      </React.Fragment>
    );
  }
}

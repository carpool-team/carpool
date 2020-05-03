import React, { Component } from "react";
import { NavBar } from "../navBar/NavBar";
import LayoutRouter from "./components/LayoutRouter";
import { RouteComponentProps, withRouter } from "react-router";
import Footer from "../footer/Footer";

import "./Layout.scss";

class Layout extends Component<RouteComponentProps> {

	render: () => JSX.Element = () => {
		return (
			<React.Fragment>
				<NavBar />
				<LayoutRouter
					match={this.props.match}
					history={this.props.history}
					location={this.props.location}
					staticContext={this.props.staticContext}
				/>
				<Footer />
			</React.Fragment>
		);
	}
}

export default withRouter(Layout);
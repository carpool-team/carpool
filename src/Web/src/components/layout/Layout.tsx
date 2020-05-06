import React, { Component } from "react";
import { NavBar } from "../navBar/NavBar";
import Footer from "../Footer/Footer";
import LayoutRouter from "./components/LayoutRouter";
import { RouteComponentProps, withRouter } from "react-router";

import "./Layout.scss";

class Layout extends Component<RouteComponentProps> {

	render: () => JSX.Element = () => {
		return (
			<React.Fragment>
				<NavBar />
				<LayoutRouter
					match={this.props.match}
					staticContext={this.props.staticContext}
					history={this.props.history}
					location={this.props.location}
				/>
				<Footer />
			</React.Fragment>
		);
	}
}

export default withRouter(Layout);
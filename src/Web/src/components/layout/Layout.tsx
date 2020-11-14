import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../footer/Footer";
import LayoutRouter from "./components/LayoutRouter";
import { RouteComponentProps, withRouter } from "react-router";
import { ToastContainer } from "react-toastify";

import "./Layout.scss";
import "react-toastify/dist/ReactToastify.css";

class Layout extends Component<RouteComponentProps> {
	private cssClasses = {
		main: "main"
	};

	private mainPaths: string[] = ["/", ""];

	render: () => JSX.Element = () => {
		// current url
		const { pathname } = this.props.location;
		return (
			<React.Fragment>
				<NavBar />
				<ToastContainer />
				<main className={this.cssClasses.main}>
					<LayoutRouter
						match={this.props.match}
						staticContext={this.props.staticContext}
						history={this.props.history}
						location={this.props.location}
					/>
				</main>
				<Footer />
			</React.Fragment>
		);
	}
}

export default withRouter(Layout);

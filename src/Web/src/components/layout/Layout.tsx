import React, { Component } from "react";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import LayoutRouter from "./components/LayoutRouter";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { DispatchProps, mapDispatchToProps, mapStateToProps, StateProps } from "./store/PropsTypes";

import "./Layout.scss";
import "react-toastify/dist/ReactToastify.css";

interface ILayoutProps extends RouteComponentProps, StateProps, DispatchProps { }

class Layout extends Component<ILayoutProps> {
	private cssClasses = {
		main: "main"
	};

	private mainPaths: string[] = ["/", ""];

	render: () => JSX.Element = () => {
		// current url
		const { pathname } = this.props.location;
		if (this.props?.redirectTo) {
			this.props.redirected();
			return <Redirect to={this.props.redirectTo} />;
		} else {
			return (
				<React.Fragment>
					<NavBar />
					<ToastContainer />
					<main className={this.cssClasses.main}>
						<LayoutRouter />
					</main>
					<Footer />
				</React.Fragment>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));

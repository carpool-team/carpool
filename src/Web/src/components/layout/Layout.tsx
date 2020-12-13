import React, { useEffect } from "react";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import LayoutRouter from "./components/LayoutRouter";
import { RouteComponentProps, withRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { DispatchProps, mapDispatchToProps, mapStateToProps, StateProps } from "./store/PropsTypes";
import LoaderSplash from "../ui/loaderSplash/LoaderSplash";
import { CssClass } from "./enums/CssClass";

import "./Layout.scss";
import "react-toastify/dist/ReactToastify.css";

interface ILayoutProps extends RouteComponentProps, StateProps, DispatchProps { }

const Layout: (props: ILayoutProps) => JSX.Element = props => {
	// current url
	const { pathname } = props.location;
	useEffect(() => {
		if (props.redirectTo) {
			console.log(`Redirecting from ${pathname} to ${props.redirectTo}`);
			props.history.push(props.redirectTo);
			props.redirected();
		}
	}, [props.redirectTo]);

	const mainPaths: string[] = ["/", ""];

	const mainHeight: number = document.querySelector(".main")?.clientHeight;

	const mainCssClasses: string[] = [CssClass.Main];
	// main page should have different height
	if (mainPaths.includes(pathname)) {
		mainCssClasses.push(CssClass.MainFlex);
	}

	return (
		<React.Fragment>
			<NavBar />
			<ToastContainer />
			<main className={mainCssClasses.join(" ")}>
				<LoaderSplash
					active={props.loaderVisible}
					height={mainHeight}
				>
					<LayoutRouter />
				</LoaderSplash>
			</main>
			<Footer />
		</React.Fragment>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));

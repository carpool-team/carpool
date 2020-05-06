import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import LayoutRouter from "../layout/components/LayoutRouter";

class Footer extends React.Component {
	render() {
		return (
			<footer id="footerContainer" className="footerContainer">
				<div className="footerLinks">
					<div className="footerBox logo"></div>
					<a className="footerBox android"></a>
					<a className="footerBox ios"></a>
					<div className="footerBox footerSocials">
						<a className="social fb"></a>
						<a className="social ig"></a>
						<a className="social tw"></a>
					</div>
				</div>
				<div className="footerGroup g1">
					<a className="footerGroupTitle">Usługi</a>
					<a className="footerGroupElement">Pasażer</a>
					<a className="footerGroupElement">Kierowca</a>
					<a className="footerGroupElement">Firma</a>
					<Link
						className={"footerGroupElement"}
						to={`/${LayoutRouter.routes.groups}`}
					>
						Grupy
					</Link>
				</div>
				<div className="footerGroup g2">
					<a className="footerGroupTitle">O nas</a>
					<a className="footerGroupElement">Idea</a>
					<a className="footerGroupElement">Środowisko</a>
				</div>
				<div className="footerGroup g3">
					<a className="footerGroupTitle">PL-PL</a>
				</div>
			</footer>
		);
	}
}

export default Footer;
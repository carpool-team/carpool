import React from "react";
import "./NavBar.scss";
import Button from "../ui/Button/Button";
import { ButtonSize } from "../ui/Button/enums/ButtonSize";
import { ButtonType } from "../ui/Button/enums/ButtonType";

export class NavBar extends React.Component {
	state = {
		logged: false,
		hamburgerActive: false,
	};

	handleHamburgerClick = () => {
		let elem = document.getElementById("hamburgerIcon");
		elem?.classList.toggle("change");
		let menu = document.getElementById("navButtons");
		menu?.classList.toggle("hamburgerToogle");
	}

	render() {
		return (
			<div id="container" className="navBarContainer">
				<div className="logoContainer"></div>
				<div className="navButtons hamburgerToogle" id="navButtons">
					<nav className="navPlain">
						<a className="navButtonPlain " href="/">
							Pasażer
						</a>
						<a className="navButtonPlain " href="/">
							Kierowca
						</a>
						<a className="navButtonPlain " href="/">
							Firma
						</a>
					</nav>
					<nav className="navAccount">
						<Button
							size={ButtonSize.Large}
							type={ButtonType.Success}
							onClick={() => { }}
						>
							Zaloguj się
						</Button>
						<Button
							size={ButtonSize.Large}
							type={ButtonType.Info}
							onClick={() => { }}
						>
							Zarejestruj się
						</Button>
					</nav>
				</div>
				<div
					id="hamburgerIcon"
					className="hamburgerIcon"
					onClick={this.handleHamburgerClick.bind(this)}
				>
					<div className="bar1"></div>
					<div className="bar2"></div>
					<div className="bar3"></div>
				</div>
			</div>
		);
	}
}

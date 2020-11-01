import React from "react";
import "./NavBar.scss";
import Button from "../ui/Button/Button";
import { ButtonSize } from "../ui/Button/enums/ButtonSize";
import { ButtonType } from "../ui/Button/enums/ButtonType";
import { ButtonShape } from "../ui/Button/enums//ButtonShape";
import { IReactI18nProps } from "../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import App from "../../App";


interface INavBarProps extends IReactI18nProps { }

interface INavBarState {
	logged: boolean;
	hamburgerActive: boolean;
}

class NavBar extends React.Component<INavBarProps, INavBarState> {
	private cssClasses = {
		hamburgerIcon: "hamburgerIcon",
		change: "change",
		navButtons: "navButtons",
		hamburgerToggle: "hamburgerToogle",
		bar1: "bar1",
		bar2: "bar2",
		bar3: "bar3",
		logoContainer: "logoContainer",
		navBarContainer: "navBarContainer",
		navAccount: "navAccount",
		navButtonPlain: "navButtonPlain",
		navPlain: "navPlain",
	};

	private ids = {
		hamburgeIcon: "hamburgerIcon",
		container: "container",
		navButtons: "navButtons",
	};

	private resources = {
		passenger: "common.passenger",
		driver: "common.driver",
		business: "common.business",
		login: "navBar.login",
		register: "navBar.register",
	};

	constructor(props: INavBarProps) {
		super(props);
		this.state = {
			logged: false,
			hamburgerActive: false,
		};
	}

	private handleHamburgerClick = () => {
		let elem = document.getElementById(this.cssClasses.hamburgerIcon);
		elem?.classList.toggle(this.cssClasses.change);
		let menu = document.getElementById(this.cssClasses.navButtons);
		menu?.classList.toggle(this.cssClasses.hamburgerToggle);
	}

	render() {
		const { t } = this.props;
		return (
			<div id={this.ids.container} className={this.cssClasses.navBarContainer}>
				<div className={this.cssClasses.logoContainer}></div>
				<div className={[this.cssClasses.navButtons, this.cssClasses.hamburgerToggle].join(" ")} id={this.ids.navButtons}>
					<nav className={this.cssClasses.navPlain}>
						<a className={this.cssClasses.navButtonPlain} href={App.rootRoute}>
							{t(this.resources.passenger)}
						</a>
						<a className={this.cssClasses.navButtonPlain} href={App.rootRoute}>
							{t(this.resources.driver)}
						</a>
						<a className={this.cssClasses.navButtonPlain} href={App.rootRoute}>
							{t(this.resources.business)}
						</a>
					</nav>
					<nav className={this.cssClasses.navAccount}>
						<Button
							shape={ButtonShape.NavBar}
							size={ButtonSize.Large}
							type={ButtonType.Success}
							onClick={() => { }}
						>
							{t(this.resources.login)}
						</Button>
						<Button
							shape={ButtonShape.NavBar}
							size={ButtonSize.Large}
							type={ButtonType.Info}
							onClick={() => { }}
						>
							{t(this.resources.register)}
						</Button>
					</nav>
				</div>
				<div
					id={this.ids.hamburgeIcon}
					className={this.cssClasses.hamburgerIcon}
					onClick={this.handleHamburgerClick.bind(this)}
				>
					<div className={this.cssClasses.bar1}></div>
					<div className={this.cssClasses.bar2}></div>
					<div className={this.cssClasses.bar3}></div>
				</div>
			</div>
		);
	}
}

export default withTranslation()(NavBar);

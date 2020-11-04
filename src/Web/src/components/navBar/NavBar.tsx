import React from "react";
import "./NavBar.scss";
import Button from "./NavButton/NavButton";
import { ButtonColor } from "./NavButton/enums/ButtonColor";
import { ButtonBackground } from "./NavButton/enums/ButtonBackground";
import {ButtonIcon} from "./NavButton/enums/ButtonIcon"
import { IReactI18nProps } from "../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import LayoutRouter from "../layout/components/LayoutRouter";
import { from } from "rxjs";


interface INavBarProps extends IReactI18nProps { }

interface INavBarState {
	logged: boolean;
	hamburgerActive: boolean;
}

class NavBar extends React.Component<INavBarProps, INavBarState> {
	private cssClasses = {
		navBarContainer: "navBarContainer",
		logoContainer: "logoContainer",
		navBarTabContainer: "navBarTabContainer",
		navBarTabButton: "navBarTabButton",
		navBarAccountContainer: "navBarAccountContainer",
		hamburgerMenuButtons: "hamburgerMenuButtons",
		hamburgerIcon: "hamburgerIcon",
		hamburgerToggle: "hamburgerToogle",
		change: "change",
		bar1: "bar1",
		bar2: "bar2",
	};

	private ids = {
		hamburgeIcon: "hamburgerIcon",
		container: "navBarContainer",
		hamburgerMenuButtons: "hamburgerMenuButtons",
	};

	private resources = {
		passenger: "common.passenger",
		driver: "common.driver",
		groups: "common.groups",
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
		let menu = document.getElementById(this.cssClasses.hamburgerMenuButtons);
		menu?.classList.toggle(this.cssClasses.hamburgerToggle);
	}

	render() {
		const { t } = this.props;
		return (
			<div id={this.ids.container} className={this.cssClasses.navBarContainer}>
				<div className={this.cssClasses.navBarTabContainer}>
					<a href={`/${LayoutRouter.routes.default}`}>
						<div className={this.cssClasses.logoContainer}></div>
					</a>
					<div className={[this.cssClasses.hamburgerMenuButtons, this.cssClasses.hamburgerToggle].join(" ")} id={this.ids.hamburgerMenuButtons}>
						<Button
								color={ButtonColor.Gray}
								background ={ButtonBackground.None}
								onClick={this.handleHamburgerClick.bind(this)}
								>
										{t(this.resources.passenger)}
							</Button>
							<Button
								color={ButtonColor.Gray}
								background ={ButtonBackground.None}
								onClick={this.handleHamburgerClick.bind(this)}
								>
										{t(this.resources.driver)}
							</Button>
							<Button
								color={ButtonColor.Gray}
								background ={ButtonBackground.None}
								onClick={this.handleHamburgerClick.bind(this)}
								to={`/${LayoutRouter.routes.groups}`}
								>
										{t(this.resources.groups)}
							</Button>
						</div>
					</div>

					<div className={this.cssClasses.navBarAccountContainer}>
						<Button
							color={ButtonColor.Gray}
							background ={ButtonBackground.None}
							icon ={ButtonIcon.User}
							onClick={() => { }}
							>
								<span>		
									{t(this.resources.login)}
								</span>
						</Button>
						
						<Button
							color={ButtonColor.White}
							background ={ButtonBackground.Blue}
							onClick={() => { }}
						>
							{t(this.resources.register)}
						</Button>
					</div>
					<div
						id={this.ids.hamburgeIcon}
						className={this.cssClasses.hamburgerIcon}
						onClick={this.handleHamburgerClick.bind(this)}
					>
					<div className={this.cssClasses.bar1}></div>
					<div className={this.cssClasses.bar2}></div>
					</div>
			</div>
		);
	}
}

export default withTranslation()(NavBar);

import React from "react";
import { IReactI18nProps } from "../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import LayoutRouter, { mainRoutes } from "../layout/components/LayoutRouter";
import ButtonLink from "../ui/buttonLink/ButtonLink";
import { ButtonLinkColor } from "../ui/buttonLink/enums/ButtonLinkColor";
import { ButtonLinkBackground } from "../ui/buttonLink/enums/ButtonLinkBackground";
import "./Footer.scss";
import { isAuthorized } from "../../helpers/UniversalHelper";
import { rideRoutes } from "../rides/RidesRouter";

interface IFooterProps extends IReactI18nProps { }

class Footer extends React.Component<IFooterProps> {
	private cssClasses = {
		footerContainer: "footerContainer",
		footerSubContainer: "footerSubContainer",
		footerGoogle: "footerSocialsGoogle",
		footerSocials: "footerSocials",
		footerFacebook: "footerSocials--facebook",
		footerTwitter: "footerSocials--twitter",
		footerInstagram: "footerSocials--instagram",
		footerTitle: "footerTitle",
		footerLink: "footerLink"
	};

	private resources = {
		services: "footer.services",
		environment: "footer.environment",
		about: "footer.about",
		idea: "footer.idea",
		groups: "homeScreen.groups",
		reports: "homeScreen.reports",
		rides: "homeScreen.rides",
		credits: "footer.credits",
		help: "footer.help",
		requests: "rides.requestsBtn",
	};
	private ids = {
		container: "footerContainer",
	};

	renderAuthorizedContainer = () => {
		if (isAuthorized() === false) {
			return null;
		} else {
			const { t } = this.props;
			return (
				<div className={this.cssClasses.footerSubContainer}>
					<div className={this.cssClasses.footerTitle}>
						{t(this.resources.services)}
					</div>
					{/* <ButtonLink
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
						to={`/${mainRoutes.help}`}
					>
						{t(this.resources.help)}
					</ButtonLink> */}
					<ButtonLink
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
						to={`/${mainRoutes.groups}`}
					>
						{t(this.resources.groups)}
					</ButtonLink>
					<ButtonLink
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
						to={`/${mainRoutes.rides}`}
					>
						{t(this.resources.rides)}
					</ButtonLink>
					<ButtonLink
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
						to={`/${mainRoutes.rides + rideRoutes.requests}`}
					>
						{t(this.resources.requests)}
					</ButtonLink>
				</div>

			);
		}
	}

	render() {
		const { t } = this.props;
		return (
			<div id={this.ids.container} className={this.cssClasses.footerContainer}>
				<div className={this.cssClasses.footerSubContainer}>
					<a href="https://play.google.com/store/apps/details?id=com.carpool.wmi">
						<div className={this.cssClasses.footerGoogle}></div>
					</a>
					<div className={this.cssClasses.footerSocials}>
						{/* <div className={this.cssClasses.footerFacebook}></div>
						<div className={this.cssClasses.footerTwitter}></div>
						<div className={this.cssClasses.footerInstagram}></div> */}
					</div>
				</div>
				<div className={this.cssClasses.footerSubContainer}>
					<div className={this.cssClasses.footerTitle}>
						{t(this.resources.about)}
					</div>
					{/* <ButtonLink
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
						onClick={() => { }}
					>
						{t(this.resources.idea)}
					</ButtonLink>
					<ButtonLink
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
					>
						{t(this.resources.environment)}
					</ButtonLink> */}
					<ButtonLink
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
						to={`/${mainRoutes.help}`}
					>
						{t(this.resources.help)}
					</ButtonLink>
				</div>
				{this.renderAuthorizedContainer()}
				<div className={this.cssClasses.footerSubContainer}>
					<div className={this.cssClasses.footerTitle}>
						{t(this.resources.credits)}
					</div>
					<a className={this.cssClasses.footerLink} href="https://www.freepik.com/vectors" target="_blank" rel="noopener noreferrer">
						Freepic
					</a>
					<a className={this.cssClasses.footerLink} href="https://www.flaticon.com/packs/social-media-87" target="_blank" rel="noopener noreferrer">
						Flaticon
					</a>
				</div>
			</div>
		);
	}
}

export default withTranslation()(Footer);

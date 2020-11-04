import React from "react";
import { IReactI18nProps } from "../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import LayoutRouter from "../layout/components/LayoutRouter";
import ButtonLink from "../ui/buttonLink/ButtonLink"
import { ButtonColor } from "../ui/buttonLink/enums/ButtonColor";
import { ButtonBackground } from "../ui/buttonLink/enums/ButtonBackground";
import {ButtonIcon} from "../ui/buttonLink/enums/ButtonIcon"
import {ButtonUnderline} from "../ui/buttonLink/enums/ButtonUndeline"
import { from } from "rxjs";
import "./Footer.scss";


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
		credits: "footer.credits"
	};
	private ids = {
		container: "footerContainer",
	};

	render() {
		const { t } = this.props;
		return (
			<div id={this.ids.container} className={this.cssClasses.footerContainer}>
				<div className={this.cssClasses.footerSubContainer}>
					<a href="link to google play download">
						<div className={this.cssClasses.footerGoogle}></div>
					</a>
					<div className={this.cssClasses.footerSocials}>
						<div className ={this.cssClasses.footerFacebook}></div>
						<div className ={this.cssClasses.footerTwitter}></div>
						<div className ={this.cssClasses.footerInstagram}></div>			
					</div>
				</div>
				<div className={this.cssClasses.footerSubContainer}>
					<div className={this.cssClasses.footerTitle}>
						{t(this.resources.about)}
					</div>
					<ButtonLink
						color={ButtonColor.Gray}
						background ={ButtonBackground.Gray}
						onClick={()=>{}}
						>
						{t(this.resources.idea)}
					</ButtonLink>
					<ButtonLink
						color={ButtonColor.Gray}
						background ={ButtonBackground.Gray}
						>
						{t(this.resources.environment)}
					</ButtonLink>

				</div>
				<div className={this.cssClasses.footerSubContainer}>
				<div className={this.cssClasses.footerTitle}>
						{t(this.resources.services)}
					</div>
					<ButtonLink
						color={ButtonColor.Gray}
						background ={ButtonBackground.Gray}
						to={`/${LayoutRouter.routes.groups}`}
						>
						{t(this.resources.groups)}
					</ButtonLink>
					<ButtonLink
						color={ButtonColor.Gray}
						background ={ButtonBackground.Gray}
						>
						{t(this.resources.rides)}
					</ButtonLink>
					<ButtonLink
						color={ButtonColor.Gray}
						background ={ButtonBackground.Gray}
						onClick={()=>{}}
						>
						{t(this.resources.reports)}
					</ButtonLink>
				</div>
				<div className={this.cssClasses.footerSubContainer}>
					<div className={this.cssClasses.footerTitle}>
							{t(this.resources.credits)}
					</div>
					<a className= {this.cssClasses.footerLink} href="https://www.freepik.com/vectors" target="_blank" rel="noopener noreferrer">
					Freepic
					</a>
					<a className= {this.cssClasses.footerLink} href="https://www.flaticon.com/packs/social-media-87" target="_blank" rel="noopener noreferrer">
					Flaticon
					</a>
				</div>
			</div>
		);
	}
}

export default withTranslation()(Footer);

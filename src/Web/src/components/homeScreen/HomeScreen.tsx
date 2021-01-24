import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "components/system/resources/IReactI18nProps";
import { mainRoutes } from "../layout/components/LayoutRouter";
import ButtonLink from "../ui/buttonLink/ButtonLink";
import { ButtonLinkColor } from "../ui/buttonLink/enums/ButtonLinkColor";
import { ButtonLinkBackground } from "../ui/buttonLink/enums/ButtonLinkBackground";
import { ButtonLinkUnderline } from "../ui/buttonLink/enums/ButtonLinkUnderline";
import HelpBanner from "./components/HelpBanner";

import "./HomeScreen.scss";

class HomeScreen extends Component<IReactI18nProps> {
	private cssClasses = {
		homeScreenContainer: "homeScreenContainer",
		homeScreenMap: "homeScreenMap",
		homeScreenQuote: "homeScreenQuote",
		homeScreenGroups: "homeScreenGroups",
		homeScreenGroupsRectangle: "homeScreenGroupsRectangle",
		homeScreenGroupsHelp: "homeScreenGroupsHelp",
		homeScreenGroupsBtn: "homeScreenGroupsBtn",
		homeScreenGroupsTitle: "homeScreenGroupsTitle",
		homeScreenOverlap: "homeScreenOverlap",
		homeScreenGroupsImgGroup: "homeScreenGroupsImg homeScreenGroupsImg--group",
		homeScreenGroupsImgRides: "homeScreenGroupsImg homeScreenGroupsImg--rides",
		homeScreenGroupsImgReports: "homeScreenGroupsImg homeScreenGroupsImg--reports",
	};

	private resources = {
		quote: "homeScreen.quote",
		join: "homeScreen.join",
		helpRides: "homeScreen.helpRides",
		helpGroups: "homeScreen.helpGroups",
		helpRaports: "homeScreen.helpReports",
		btnRides: "homeScreen.btnRides",
		btnRaports: "homeScreen.btnReports",
		btnGroups: "homeScreen.btnGroups",
		groups: "homeScreen.groups",
		reports: "homeScreen.reports",
		rides: "homeScreen.rides",
	};

	render: () => JSX.Element = () => {
		const { t } = this.props;
		return (
			<div className={this.cssClasses.homeScreenContainer}>
				<HelpBanner />
				<div className={this.cssClasses.homeScreenOverlap}></div>
				<div className={this.cssClasses.homeScreenMap}>
					<div className={this.cssClasses.homeScreenQuote}>
						{t(this.resources.quote)}
					</div>
				</div>
				<div className={this.cssClasses.homeScreenGroups}>
					<div className={this.cssClasses.homeScreenGroupsRectangle}>
						<div className={this.cssClasses.homeScreenGroupsTitle}>
							{t(this.resources.groups)}
						</div>
						<div className={this.cssClasses.homeScreenGroupsImgGroup}></div>
						<div className={this.cssClasses.homeScreenGroupsHelp}>
							{t(this.resources.helpGroups)}
						</div>
						<div className={this.cssClasses.homeScreenGroupsBtn}>
							<ButtonLink
								color={ButtonLinkColor.Gray}
								background={ButtonLinkBackground.Tansparent}
								undeline={ButtonLinkUnderline.Solid}
								to={`/${mainRoutes.groups}`}
								onClick={() => { }}
							>
								{t(this.resources.btnGroups)}
							</ButtonLink>
						</div>
					</div>
					<div className={this.cssClasses.homeScreenGroupsRectangle}>
						<div className={this.cssClasses.homeScreenGroupsTitle}>
							{t(this.resources.rides)}
						</div>
						<div className={this.cssClasses.homeScreenGroupsImgRides}></div>
						<div className={this.cssClasses.homeScreenGroupsHelp}>
							{t(this.resources.helpRides)}
						</div>
						<div className={this.cssClasses.homeScreenGroupsBtn}>
							<ButtonLink
								color={ButtonLinkColor.Gray}
								background={ButtonLinkBackground.Tansparent}
								undeline={ButtonLinkUnderline.Solid}
							>
								{t(this.resources.btnRides)}
							</ButtonLink>
						</div>
					</div>
					<div className={this.cssClasses.homeScreenGroupsRectangle}>
						<div className={this.cssClasses.homeScreenGroupsTitle}>
							{t(this.resources.reports)}
						</div>
						<div className={this.cssClasses.homeScreenGroupsImgReports}></div>
						<div className={this.cssClasses.homeScreenGroupsHelp}>
							{t(this.resources.helpRaports)}
						</div>
						<div className={this.cssClasses.homeScreenGroupsBtn}>
							<ButtonLink
								color={ButtonLinkColor.Gray}
								background={ButtonLinkBackground.Tansparent}
								undeline={ButtonLinkUnderline.Solid}
							>
								{t(this.resources.btnRaports)}
							</ButtonLink>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default withTranslation()(HomeScreen);

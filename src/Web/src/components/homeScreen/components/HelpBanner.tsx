import React from "react";
import { withTranslation } from "react-i18next";
import { mainRoutes } from "../../layout/components/LayoutRouter";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import Button from "../../ui/button/Button";
import { ButtonIcon } from "../../ui/button/enums/ButtonIcon";
import ButtonLink from "../../ui/buttonLink/ButtonLink";
import { ButtonLinkBackground } from "../../ui/buttonLink/enums/ButtonLinkBackground";
import { ButtonLinkColor } from "../../ui/buttonLink/enums/ButtonLinkColor";
import { ButtonLinkStyle } from "../../ui/buttonLink/enums/ButtonLinkStyle";
import useForceUpdate from "../../ui/hooks/useForceUpdate/UseForceUpdate";

interface IHelpBannerProps extends IReactI18nProps {
}

const HelpBanner = (props: IHelpBannerProps) => {
	const { t } = props;
	const forceUpdate = useForceUpdate();

	const bannerClosedKey = "helpBannerClosed";

	const resources = {
		help: "homeScreen.help",
		helpBtn: "homeScreen.helpBtn"
	};

	const cssClasses = {
		homeScreenHelpContainer: "homeScreenHelpContainer",
		homeScreenHelpSubContainer: "homeScreenHelpContainer--subContainer",
		homeScreenHelpText: "homeScreenHelpContainer--text",
		homeScreenHelpButton: "homeScreenHelpContainer--button",
		homeScreenHelpCloseButton: "homeScreenHelpContainer--closeButton",
	};

	if (window.localStorage.getItem(bannerClosedKey) === null) {
		return (
			<div className={cssClasses.homeScreenHelpContainer}>
				<div className={cssClasses.homeScreenHelpSubContainer}>
					<div className={cssClasses.homeScreenHelpText}>{t(resources.help)}</div>
					<Button
						icon={ButtonIcon.Close}
						onClick={() => {
							window.localStorage.setItem(bannerClosedKey, String(true));
							forceUpdate();
						}}
						additionalCssClass={cssClasses.homeScreenHelpCloseButton}
					/>
				</div>
				<ButtonLink
					additionalCssClass={cssClasses.homeScreenHelpButton}
					style={ButtonLinkStyle.Button}
					color={ButtonLinkColor.Gray}
					background={ButtonLinkBackground.White}
					to={`/${mainRoutes.help}`}
				>
					{t(resources.helpBtn)}
				</ButtonLink>
			</div>
		);
	} else {
		return null;
	}
};

export default withTranslation()(HelpBanner);

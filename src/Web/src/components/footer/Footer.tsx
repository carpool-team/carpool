import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import LayoutRouter from "../layout/components/LayoutRouter";
import { IReactI18nProps } from "../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";

interface IFooterProps extends IReactI18nProps { }

const Footer: (props: IFooterProps) => JSX.Element = props => {
	const containerId: string = "footerContainer";

	const resources = {
		groups: "footer.groups",
		services: "footer.services",
		environment: "footer.environment",
		business: "common.business",
		passenger: "common.passenger",
		driver: "common.driver",
		about: "footer.about",
		idea: "footer.idea",
	};

	const languageSelectItems = {
		pl: "PL-PL",
	};

	const cssClasses = {
		container: "footerContainer",
		linksContainer: "footerLinks",
		boxBase: "footerBox",
		logo: "logo",
		android: "android",
		ios: "ios",
		socialsContainer: "footerSocials",
		socialIconBase: "social",
		fb: "fb",
		ig: "ig",
		tw: "tw",
		group: "footerGroup",
		groupTitle: "footerGroupTitle",
		element: "footerGroupElement",
		group1: "g1",
		group2: "g2",
		group3: "g3",
	};

	const { t } = props;

	return (
		<footer id={containerId} className={cssClasses.container}>
			<div className={cssClasses.linksContainer}>
				<div className={[cssClasses.boxBase, cssClasses.logo].join(" ")}></div>
				<a className={[cssClasses.boxBase, cssClasses.android].join(" ")}></a>
				<a className={[cssClasses.boxBase, cssClasses.ios].join(" ")}></a>
				<div className={[cssClasses.boxBase, cssClasses.socialsContainer].join(" ")}>
					<a className={[cssClasses.socialIconBase, cssClasses.fb].join(" ")}></a>
					<a className={[cssClasses.socialIconBase, cssClasses.ig].join(" ")}></a>
					<a className={[cssClasses.socialIconBase, cssClasses.tw].join(" ")}></a>
				</div>
			</div>
			<div className={[cssClasses.group, cssClasses.group1].join(" ")}>
				<a className={cssClasses.groupTitle}>
					{t(resources.services)}
				</a>
				<a className={cssClasses.element}>
					{t(resources.passenger)}
				</a>
				<a className={cssClasses.element}>
					{t(resources.driver)}
				</a>
				<a className={cssClasses.element}>
					{t(resources.business)}
				</a>
				<Link
					className={cssClasses.element}
					to={`/${LayoutRouter.routes.groups}`}
				>
					{t(resources.groups)}
				</Link>
			</div>
			<div className={[cssClasses.group, cssClasses.group2].join(" ")}>
				<a className={cssClasses.groupTitle}>
					{t(resources.about)}
				</a>
				<a className={cssClasses.element}>
					{t(resources.idea)}
				</a>
				<a className={cssClasses.element}>
					{t(resources.environment)}
				</a>
			</div>
			<div className={[cssClasses.group, cssClasses.group3].join(" ")}>
				<a className={cssClasses.groupTitle}>{languageSelectItems.pl}</a>
			</div>
		</footer>
	);
};

export default withTranslation()(Footer);

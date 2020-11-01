import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "components/system/resources/IReactI18nProps";
import { ButtonType } from "../ui/Button/enums/ButtonType";
import {ButtonSize} from "../ui/Button/enums/ButtonSize"
import LayoutRouter from "../layout/components/LayoutRouter";
import ButtonLink from '../ui/Button/ButtonLink';
import "./LoadingScreen.scss";

import groupImg from "assets_path/img/groups_baner.png";



class LoadingScreen extends Component<IReactI18nProps> {
	private cssClasses = {
		container: "loadingScreen",
		map: "loadingScreen__map",
		quote: "loadingScreen__quote",
		groups: "loadingScreen__groups",
		groups_baner: "loadingScreen__groups--baner",
		groups_button: "loadingScreen__groups--button",
		groups_img: "loadingScreen__groups--img"
	};

	private resources = {
		quote: "loadingScreen.quote",
		join: "loadingScreen.join"
	};
	

	render: () => JSX.Element = () => {
		const { t } = this.props;
		return (
			<div className={this.cssClasses.container}>
				<div className={this.cssClasses.map}>
					<div className={this.cssClasses.quote}>
						{t(this.resources.quote)}
					</div>
				</div>
				<div className={this.cssClasses.groups}>
					<div className={this.cssClasses.groups_button}>
						<ButtonLink
							size={ButtonSize.Standard}
							to={`/${LayoutRouter.routes.groups}`}
							type={ButtonType.Standard}
			    		>
							{t(this.resources.join)}
						</ButtonLink>
					</div>
					<div className={this.cssClasses.groups_baner}>
						<img className= {this.cssClasses.groups_img }src={groupImg}></img>
					</div>
				</div>
			</div>
		);
	}
}

export default withTranslation()(LoadingScreen);

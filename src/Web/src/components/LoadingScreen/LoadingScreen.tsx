import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "components/system/resources/IReactI18nProps";
import Button from "../ui/Button/Button";
import { ButtonType } from "../ui/Button/enums/ButtonType";

import "./LoadingScreen.scss";

import groupImg from "assets_path/img/groups_baner.png";


class LoadingScreen extends Component<IReactI18nProps> {
	private cssClasses = {
		container: "loadingScreen",
		map: "loadingScreen__map",
		quote: "loadingScreen__quote",
		groups: "loadingScreen__groups",
		groups_baner: "loadingScreen__groups--baner",
		groups_button: "loadingScreen__groups--button"
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
						<Button
							onClick={()=>{}}
							type={ButtonType.Info}
			    		>
							{t(this.resources.join)}
						</Button>
					</div>
					<div className={this.cssClasses.groups_baner}>
						<img src={groupImg}></img>
					</div>
				</div>
			</div>
		);
	}
}

export default withTranslation()(LoadingScreen);
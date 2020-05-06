import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "components/system/resources/IReactI18nProps";

import "./LoadingScreen.scss";

class LoadingScreen extends Component<IReactI18nProps> {
	private cssClasses = {
		container: "loadingScreen",
		map: "loadingScreen__map",
		quote: "loadingScreen__quote",
	};

	private resources = {
		quote: "loadingScreen.quote",
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
			</div>
		);
	}
}

export default withTranslation()(LoadingScreen);
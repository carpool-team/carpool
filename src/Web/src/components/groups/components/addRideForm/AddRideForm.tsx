import React from "react";
import { render } from "react-dom";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";

interface IAddRideFormProps extends IReactI18nProps { }

class AddRideFormScreen extends React.Component<IAddRideFormProps> {
	private cssClasses = {

	};
	render() {
		return (
			<div>
			fdafdsa
			</div>
		);
	}
}

export default withTranslation()(AddRideFormScreen);

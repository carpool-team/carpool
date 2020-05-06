import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "components/system/resources/IReactI18nProps";
import { IGroupCallbacks } from "../interfaces/IGroupCallbacks";

interface IAddGroupFormScreenProps extends IReactI18nProps {
	callbacks: IGroupCallbacks;
}

class AddGroupFormScreen extends Component<IAddGroupFormScreenProps> {
	render() {
		return (
			<form>
			</form>
		);
	}
}

export default withTranslation()(AddGroupFormScreen);

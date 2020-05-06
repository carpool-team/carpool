import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "components/system/resources/IReactI18nProps";

interface IAddGroupFormScreenProps extends IReactI18nProps { }

class AddGroupFormScreen extends Component<IAddGroupFormScreenProps> {
	render() {
		return (
			<div>
				DDDD
			</div>
		);
	}
}

export default withTranslation()(AddGroupFormScreen);

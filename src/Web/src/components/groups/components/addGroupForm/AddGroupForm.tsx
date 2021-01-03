import React, { Component } from "react";
import produce from "immer";
import _ from "lodash";
import FirstStep from "./components/Form";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../../components/system/resources/IReactI18nProps";
import { IGroupCallbacks } from "../../interfaces/IGroupCallbacks";
import { IFormData } from "./interfaces/IFormData";
import { mainRoutes } from "../../../layout/components/LayoutRouter";

interface IAddGroupFormScreenProps extends IReactI18nProps {
	callbacks: IGroupCallbacks;
	userId: string;
}

interface IAddGroupFormScreenState {
	formData: IFormData;
}

/** Initial data for use in form component */
const initialFormData: IFormData = {
	group: {
		address: "",
		code: "",
		groupName: "",
		location: {
			latitude: 0,
			longitude: 0,
		},
	},
};

class AddGroupFormScreen extends Component<IAddGroupFormScreenProps, IAddGroupFormScreenState> {
	constructor(props: IAddGroupFormScreenProps) {
		super(props);
		this.state = {
			formData: initialFormData,
		};
	}

	/**
	 * Generic handler for changing form data
	 *
	 * @param newValue new value to assign
	 * @param key form data object value key to assign to
	 */
	private changeHandler = (newValue: string, key: string) => {
		this.setState(
			produce((draft: IAddGroupFormScreenState) => {
				_.set(draft.formData, key, newValue);
			})
		);
	}

	private createGroup = () => {
		this.props.callbacks.addGroup(this.state.formData.group);
		this.props.callbacks.redirect("/" + mainRoutes.groups); // make path absolute
	}

	render() {
		return <FirstStep
			data={this.state.formData}
			callbacks={{
				handleChange: this.changeHandler,
				createGroup: this.createGroup,
			}}
		/>;
	}
}

export default withTranslation()(AddGroupFormScreen);

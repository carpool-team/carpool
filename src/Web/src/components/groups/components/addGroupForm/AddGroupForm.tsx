import React, { Component } from "react";
import produce from "immer";
import SecondStep from "./SecondStep";
import FirstStep from "./FirstStep";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../../components/system/resources/IReactI18nProps";
import { IGroupCallbacks } from "../../interfaces/IGroupCallbacks";
import { IFormData } from "./interfaces/IFormData";

interface IAddGroupFormScreenProps extends IReactI18nProps {
	callbacks: IGroupCallbacks;
}

interface IAddGroupFormScreenState {
	formData: IFormData;
}

class AddGroupFormScreen extends Component<IAddGroupFormScreenProps, IAddGroupFormScreenState> {
	constructor(props: IAddGroupFormScreenProps) {
		super(props);
		this.state = {
			formData: {
				groupName: "",
				step: 1,
				code: "",
				address: "",
			}
		};
	}

	private handleChangeGroupName = (newValue: string) => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.formData.groupName = newValue;
		}));
	}

	private handleChangeCode = (newValue: string) => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.formData.code = newValue;
		}));
	}

	private handleChangeAddress = (newValue: string) => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.formData.address = newValue;
		}));
	}

	private incrementStep = () => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.formData.step += 1;
		}));
	}

	private renderFirstStep = () => (
		<FirstStep
			data={this.state.formData}
			callbacks={{
				handleChangeGroupName: this.handleChangeGroupName,
				handleChangeCode: this.handleChangeCode,
				handleChangeAddress: this.handleChangeAddress,
				incrementStep: this.incrementStep
			}}
		/>
	)

	private renderSecondStep = () => (
		<SecondStep
			data={this.state.formData}
			callbacks={{

			}}
		/>
	)

	render() {
		if (this.state.formData.step === 1) {
			return this.renderFirstStep();
		} else {
			return this.renderSecondStep();
		}
	}
}

export default withTranslation()(AddGroupFormScreen);

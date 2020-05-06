import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../components/system/resources/IReactI18nProps";
import { IGroupCallbacks } from "../interfaces/IGroupCallbacks";
import Input from "../../ui/input/Input";
import { InputType } from "../../ui/input/enums/InputType";
import produce from "immer";

interface IAddGroupFormScreenProps extends IReactI18nProps {
	callbacks: IGroupCallbacks;
}

interface IAddGroupFormScreenState {
	groupName: string;
}

class AddGroupFormScreen extends Component<IAddGroupFormScreenProps, IAddGroupFormScreenState> {
	constructor(props: IAddGroupFormScreenProps) {
		super(props);
		this.state = {
			groupName: ""
		};
	}

	private handleChangeGroupName = (newValue: string) => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.groupName = newValue;
		}));
	}

	render() {
		return (
			<form>
				<Input
					type={InputType.Text}
					changeHandler={this.handleChangeGroupName}
					value={this.state.groupName}
				/>
			</form>
		);
	}
}

export default withTranslation()(AddGroupFormScreen);

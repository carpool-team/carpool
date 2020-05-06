import React, { Component } from "react";
import produce from "immer";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../components/system/resources/IReactI18nProps";
import { IGroupCallbacks } from "../interfaces/IGroupCallbacks";
import Input from "../../ui/input/Input";
import { InputType } from "../../ui/input/enums/InputType";
import Button from "../../ui/Button/Button";

interface IAddGroupFormScreenProps extends IReactI18nProps {
	callbacks: IGroupCallbacks;
}

interface IAddGroupFormScreenState {
	groupName: string;
	step: number;
}

class AddGroupFormScreen extends Component<IAddGroupFormScreenProps, IAddGroupFormScreenState> {
	private resources = {
		nextBtn: "nextBtn",
	};

	private cssClasses = {
		firstStep: {
			container: "formContainer"
		},
	};

	constructor(props: IAddGroupFormScreenProps) {
		super(props);
		this.state = {
			groupName: "",
			step: 1,
		};
	}

	private handleChangeGroupName = (newValue: string) => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.groupName = newValue;
		}));
	}

	private incrementStep = () => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.step += 1;
		}));
	}

	private renderFirstStep = () => {
		const { t } = this.props;
		return (
			<div className={this.cssClasses.firstStep.container}>
				<Input
					type={InputType.Text}
					changeHandler={this.handleChangeGroupName}
					value={this.state.groupName}
				/>
				<Button onClick={this.incrementStep} >
					{t(this.resources.nextBtn)}
				</Button>
			</div>
		);
	}

	render() {
		if (this.state.step === 1) {
			return this.renderFirstStep();
		} else {
			return <div className=""></div>
		}
	}
}

export default withTranslation()(AddGroupFormScreen);

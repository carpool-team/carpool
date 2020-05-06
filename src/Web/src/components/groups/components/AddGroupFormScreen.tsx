import React, { Component } from "react";
import produce from "immer";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../components/system/resources/IReactI18nProps";
import { IGroupCallbacks } from "../interfaces/IGroupCallbacks";
import Input from "../../ui/input/Input";
import { InputType } from "../../ui/input/enums/InputType";
import Button from "../../ui/Button/Button";

import mapImage from "assets_path/img/loadingMap.png";

interface IAddGroupFormScreenProps extends IReactI18nProps {
	callbacks: IGroupCallbacks;
}

interface IAddGroupFormScreenState {
	groupName: string;
	address: string;
	code: string;
	step: number;
}

class AddGroupFormScreen extends Component<IAddGroupFormScreenProps, IAddGroupFormScreenState> {
	private resources = {
		nextBtn: "nextBtn",
		groupNameInput: "groups.groupName",
		groupCodeInput: "groups.code",
		groupCodeInputComment: "groups.codeInputComment",
		addressInput: "groups.address",
	};

	private cssClasses = {
		firstStep: {
			container: "formFirstSide__container",
			map: "formFirstSide__map",
			buttons: "formFirstSide__inputs"
		},
		secondStep: {
			container: "formSecondSide__container",
		}
	};

	constructor(props: IAddGroupFormScreenProps) {
		super(props);
		this.state = {
			groupName: "",
			step: 1,
			code: "",
			address: "",
		};
	}

	private handleChangeGroupName = (newValue: string) => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.groupName = newValue;
		}));
	}

	private handleChangeCode = (newValue: string) => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.code = newValue;
		}));
	}

	private handleChangeAddress = (newValue: string) => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.address = newValue;
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
				<div className={this.cssClasses.firstStep.buttons}>
					<Input
						type={InputType.Text}
						changeHandler={this.handleChangeGroupName}
						placeholder={t(this.resources.groupNameInput)}
						value={this.state.groupName}
					/>
					<Input
						type={InputType.Text}
						changeHandler={this.handleChangeCode}
						placeholder={t(this.resources.groupCodeInput)}
						commment={t(this.resources.groupCodeInputComment)}
						value={this.state.code}
					/>
					<Input
						type={InputType.Text}
						changeHandler={this.handleChangeAddress}
						placeholder={t(this.resources.addressInput)}
						value={this.state.address}
					/>
					<Button onClick={this.incrementStep} >
						{t(this.resources.nextBtn)}
					</Button>
				</div>
				<div className={this.cssClasses.firstStep.map}>
					<img src={mapImage} alt={""} />
				</div>
			</div>
		);
	}

	private renderSecondStep = () => {
		return (
			<div className={this.cssClasses.secondStep.container}>
				<ul>
					In progress. Data provided:
					<li>
						{this.state.groupName}
					</li>
					<li>
						{this.state.code}
					</li>
					<li>
						{this.state.address}
					</li>
				</ul>
			</div>
		);
	}

	render() {
		if (this.state.step === 1) {
			return this.renderFirstStep();
		} else {
			return this.renderSecondStep();
		}
	}
}

export default withTranslation()(AddGroupFormScreen);

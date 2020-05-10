import React from "react";
import Input from "../../../ui/input/Input";
import Button from "../../../ui/Button/Button";
import { IFormData } from "./interfaces/IFormData";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { InputType } from "../../../ui/input/enums/InputType";

import mapImage from "assets_path/img/loadingMap.png";

interface IFirstStepCallbacks {
	handleChange: (newValue: string, key: string) => void;
	incrementStep: () => void;
}

interface IFirstStepProps extends IReactI18nProps {
	data: IFormData;
	callbacks: IFirstStepCallbacks;
}

const FirstStep: (props: IFirstStepProps) => JSX.Element = props => {
	const cssClasses = {
		container: "formFirstSide__container",
		map: "formFirstSide__map",
		inputs: "formFirstSide__inputs"
	};

	const dataKeys = {
		groupName: "group.groupName",
		code: "group.code",
		address: "group.address"
	};

	const resources = {
		nextBtn: "nextBtn",
		groupNameInput: "groups.addGroupForm.groupName",
		groupCodeInput: "groups.addGroupForm.code",
		groupCodeInputComment: "groups.addGroupForm.codeInputComment",
		addressInput: "groups.addGroupForm.address",
	};

	const { t } = props;

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.inputs}>
				<Input
					type={InputType.Text}
					changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.groupName)}
					placeholder={t(resources.groupNameInput)}
					value={props.data.group.groupName}
				/>
				<Input
					type={InputType.Text}
					changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.code)}
					placeholder={t(resources.groupCodeInput)}
					commment={t(resources.groupCodeInputComment)}
					value={props.data.group.code}
				/>
				<Input
					type={InputType.Text}
					changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.address)}
					placeholder={t(resources.addressInput)}
					value={props.data.group.address}
				/>
				<Button onClick={props.callbacks.incrementStep} >
					{t(resources.nextBtn)}
				</Button>
			</div>
			<div className={cssClasses.map}>
				<img src={mapImage} alt={""} />
			</div>
		</div>
	);
};

export default withTranslation()(FirstStep);
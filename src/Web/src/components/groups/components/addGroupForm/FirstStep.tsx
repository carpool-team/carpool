import React from "react";
import Input from "../../../ui/input/Input";
import Button from "../../../ui/Button/Button";
import { IFormData } from "./interfaces/IFormData";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { InputType } from "../../../ui/input/enums/InputType";

import mapImage from "assets_path/img/loadingMap.png";

interface IFirstStepCallbacks {
	handleChangeGroupName: (newValue: string) => void;
	incrementStep: () => void;
	handleChangeAddress: (newValue: string) => void;
	handleChangeCode: (newValue: string) => void;
}

interface IFirstStepProps extends IReactI18nProps {
	data: IFormData;
	callbacks: IFirstStepCallbacks;
}

const FirstStep: (props: IFirstStepProps) => JSX.Element = props => {
	const cssClasses = {
		container: "formFirstSide__container",
		map: "formFirstSide__map",
		buttons: "formFirstSide__inputs"
	};

	const resources = {
		nextBtn: "nextBtn",
		groupNameInput: "groups.groupName",
		groupCodeInput: "groups.code",
		groupCodeInputComment: "groups.codeInputComment",
		addressInput: "groups.address",
	};

	const { t } = props;

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.buttons}>
				<Input
					type={InputType.Text}
					changeHandler={props.callbacks.handleChangeGroupName}
					placeholder={t(resources.groupNameInput)}
					value={props.data.groupName}
				/>
				<Input
					type={InputType.Text}
					changeHandler={props.callbacks.handleChangeCode}
					placeholder={t(resources.groupCodeInput)}
					commment={t(resources.groupCodeInputComment)}
					value={props.data.code}
				/>
				<Input
					type={InputType.Text}
					changeHandler={props.callbacks.handleChangeAddress}
					placeholder={t(resources.addressInput)}
					value={props.data.address}
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
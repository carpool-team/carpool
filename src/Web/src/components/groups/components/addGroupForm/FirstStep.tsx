import React, { useState } from "react";
import MediaQuery from "react-responsive";
import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import { ButtonBackground } from "../../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../../ui/button/enums/ButtonColor";
import { IFormData } from "./interfaces/IFormData";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { InputType } from "../../../ui/input/enums/InputType";
import { InputIcon } from "../../../ui/input/enums/InputIcon";
import MapBoxPicker from "../../../map/MapBoxPicker";
import { ValidationType } from "../../../ui/input/enums/ValidationType";
import { each } from "../../../../helpers/UniversalHelper";

interface IFirstStepCallbacks {
	handleChange: (newValue: string, key: string) => void;
	incrementStep: () => void;
}

interface IFirstStepProps extends IReactI18nProps {
	data: IFormData;
	callbacks: IFirstStepCallbacks;
}

const FirstStep: (props: IFirstStepProps) => JSX.Element = props => {
	const [inputsValid, setInputsValid] = useState({
		name: false,
		code: false,
		location: false,
	});
	const [validate, setValidate] = useState(false);
	const [addressCoordinates, setAddressCoordinates] = useState(undefined);

	const cssClasses = {
		container: "addGroupContainer",
		map: "addGroupFirstSide__map",
		inputs: "addGroupFirstSide__inputs"
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
		basicInfo: "groups.addGroupForm.basicInfo"
	};

	const incrementStepClick = () => {
		if (each(inputsValid, i => i)) {
			props.callbacks.incrementStep();
			setValidate(false);
			setInputsValid({
				name: false,
				code: false,
				location: false,
			});
		} else {
			setValidate(true);
		}
	};
	const { t } = props;

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.inputs}>
				<span>{t(resources.basicInfo)}</span>
				<Input
					type={InputType.Text}
					changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.groupName)}
					placeholder={t(resources.groupNameInput)}
					value={props.data.group.groupName}
					icon={InputIcon.Globe}
					validation={{
						type: ValidationType.Required,
						isValidCallback: isValid => {
							setInputsValid({
								...inputsValid,
								name: isValid,
							});
						},
						validate
					}}
				/>
				<Input
					type={InputType.Text}
					changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.code)}
					placeholder={t(resources.groupCodeInput)}
					value={props.data.group.code}
					icon={InputIcon.Code}
					validation={{
						type: ValidationType.Required,
						isValidCallback: isValid => {
							setInputsValid({
								...inputsValid,
								code: isValid,
							});
						},
						validate
					}}
				/>
				<Input
					type={InputType.Address}
					changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.address)}
					placeholder={t(resources.addressInput)}
					value={props.data.group.address}
					icon={InputIcon.Location}
					addressCords={coords => setAddressCoordinates(coords)}
					validation={{
						type: ValidationType.Address,
						isValidCallback: isValid => {
							setInputsValid({
								...inputsValid,
								location: isValid,
							});
						},
						validate
					}}
				/>
				<Button onClick={incrementStepClick} color={ButtonColor.White} background={ButtonBackground.Blue}>
					{t(resources.nextBtn)}
				</Button>
			</div>
			<MediaQuery query="(min-width: 900px)">
				<div className={cssClasses.map}>
					<MapBoxPicker location={addressCoordinates} />
				</div>
			</MediaQuery>
		</div>
	);
};

export default withTranslation()(FirstStep);

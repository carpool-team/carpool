import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useImmer } from "use-immer";
import { connect } from "react-redux";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { each } from "../../../../helpers/UniversalHelper";
import Input from "../../../ui/input/Input";
import { InputType } from "../../../ui/input/enums/InputType";
import { InputIcon } from "../../../ui/input/enums/InputIcon";
import { ValidationType } from "../../../ui/input/enums/ValidationType";
import Button from "../../../ui/button/Button";
import { ButtonColor } from "../../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../../ui/button/enums/ButtonBackground";
import { ProfileList } from "../enums/ProfileList";
import ButtonLink from "../../../ui/buttonLink/ButtonLink";
import { ButtonLinkColor } from "../../../ui/buttonLink/enums/ButtonLinkColor";
import { ButtonLinkBackground } from "../../../ui/buttonLink/enums/ButtonLinkBackground";
import { ButtonLinkUnderline } from "../../../ui/buttonLink/enums/ButtonLinkUnderline";
import usePassword from "../../register/hooks/PasswordInput";

interface IUserPasswordProps extends IReactI18nProps {
	setCurrentList: (List: ProfileList) => void;
}

const UserPassword: React.FC<IUserPasswordProps> = (props) => {
	const { t } = props;

	const resources = {
		label: "auth.userProfile.changePassword",
		back: "prevBtn",
		submit: "auth.userProfile.save",
		currentPassword: "auth.userProfile.currentPassword"
	};

	const cssClasses = {
		inputs: "auth__inputs",
		input: "auth__inputs--input",
		button: "auth__inputs--button",
		buttonContainer: "auth__inputs--buttonContainer",
		label: "auth__inputs--label",
	};

	const [currentPassword, setCurrentPassword] = useState<string>()
	const [password, isPasswordValid, renderPasswordInputs] = usePassword();
	const [validate, setValidate] = useState(false);
	const [inputsValid, setInputsValid] = useImmer({
		currentPassword: false,
	});

	const validateForm = () => {
		let isFormValid: boolean = true;
		if (!isPasswordValid) {
			isFormValid = false;
		}
		if (each(inputsValid, i => i)) {
			isFormValid = true;
			setValidate(false);
		} else {
			isFormValid = false;
			setValidate(true);
		}
		return isFormValid;
	};

	const onClickSubmit = () => {
		if (validateForm()) {

		};
		//TODO wysyłać request jak użytkownik wyśle dane.
		// props.register(data);
		// props.setLoaderVisible(true);
	};

	const onClickBack = () => {
		props.setCurrentList(ProfileList.Data);
	}

	return (
		<div className={cssClasses.inputs}>
			<span className={cssClasses.label}>{t(resources.label)}</span>
			<Input
				style={cssClasses.input}
				type={InputType.Text}
				changeHandler={newValue => { setCurrentPassword(newValue); }}
				placeholder={t(resources.currentPassword)}
				value={currentPassword}
				validation={{
					type: ValidationType.Required,
					isValidCallback: isValid => {
						setInputsValid(draft => {
							draft.currentPassword = isValid;
						});
					},
					validate,
				}}
			/>
			{renderPasswordInputs()}
			<div className={cssClasses.buttonContainer}>
				<Button
					additionalCssClass={cssClasses.button}
					onClick={onClickBack}
					color={ButtonColor.Gray}
					background={ButtonBackground.Gray}
				>
					{t(resources.back)}
				</Button>
				<Button
					additionalCssClass={cssClasses.button}
					onClick={onClickSubmit}
					color={ButtonColor.White}
					background={ButtonBackground.Blue}
				>
					{t(resources.submit)}
				</Button>
			</div>
		</div>
	);
};

export default withTranslation()(UserPassword);

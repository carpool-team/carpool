import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { useImmer } from "use-immer";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { each } from "../../../helpers/UniversalHelper";
import Input from "../../ui/input/Input";
import { InputType } from "../../ui/input/enums/InputType";
import { ValidationType } from "../../ui/input/enums/ValidationType";
import Button from "../../ui/button/Button";
import { ButtonColor } from "../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../ui/button/enums/ButtonBackground";
import { ProfileList } from "../enums/ProfileList";
import usePasswordWithConfirm from "../../ui/hooks/usePasswordWithConfirm/UsePasswordWithConfirm";
import { IChangePasswordFormData } from "../interfaces/IChangePasswordFormData";
import { InputIcon } from "../../ui/input/enums/InputIcon";
import { connect } from "react-redux";
import { DispatchProps, mapDispatchToProps, mapStateToProps, StateProps } from "../store/PropsTypes";

interface IUserPasswordProps extends IReactI18nProps, StateProps, DispatchProps {
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

	const [currentPassword, setCurrentPassword] = useState<string>();
	const [password, isPasswordValid, renderPasswordInputs] = usePasswordWithConfirm();
	const [validate, setValidate] = useState(false);
	const [inputsValid, setInputsValid] = useImmer({
		currentPassword: false,
	});

	const validateForm = () => {
		let isFormValid: boolean = true;
		if (each(inputsValid, i => i) && isPasswordValid) {
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
			const data: IChangePasswordFormData = {
				newPassword: password,
				currentPassword,
			};
			props.setLoaderVisible(true);
			props.changePassword(data);
		}
	};

	const onClickBack = () => {
		props.setCurrentList(ProfileList.Data);
	};

	return (
		<div className={cssClasses.inputs}>
			<span className={cssClasses.label}>{t(resources.label)}</span>
			<Input
				style={cssClasses.input}
				type={InputType.Password}
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
				icon={InputIcon.Password}
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

export default connect(mapStateToProps, mapDispatchToProps)(
	withTranslation()(UserPassword)
);

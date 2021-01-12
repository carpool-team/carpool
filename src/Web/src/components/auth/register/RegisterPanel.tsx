import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import Button from "../../ui/button/Button";
import { ButtonBackground } from "../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../ui/button/enums/ButtonColor";
import { InputIcon } from "../../ui/input/enums/InputIcon";
import { InputType } from "../../ui/input/enums/InputType";
import Input from "../../ui/input/Input";
import usePasswordWithConfirm from "../../ui/hooks/usePasswordWithConfirm/UsePasswordWithConfirm";
import { ValidationType } from "../../ui/input/enums/ValidationType";
import { each } from "../../../helpers/UniversalHelper";
import {
	StateProps,
	DispatchProps,
	mapStateToProps,
	mapDispatchToProps,
} from "../store/PropsTypes";

import "./RegisterPanel.scss";
import { useImmer } from "use-immer";

export interface IRegisterFormData {
	firstName: string;
	lastName: string;
	password: string;
	email: string;
}

interface IRegisterPanelProps extends IReactI18nProps, RouteComponentProps, StateProps, DispatchProps { }

const RegisterPanel = (props: IRegisterPanelProps) => {
	const { t } = props;
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [password, isPasswordValid, renderPasswordInputs] = usePasswordWithConfirm();
	const [inputsValid, setInputsValid] = useImmer({
		name: false,
		surname: false,
		email: false,
	});
	const [validate, setValidate] = useState(false);

	const cssClasses = {
		container: "auth__container",
		inputs: "auth__inputs",
		label: "auth__inputs--label",
		input: "auth__inputs--input",
		button: "auth__inputs--button",
		image: "auth__image--register"
	};

	const resources = {
		register: "auth.register",
		email: "auth.registerPanel.email",
		name: "auth.registerPanel.name",
		surname: "auth.registerPanel.surname",
		submit: "auth.submit",
	};

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
			const data: IRegisterFormData = {
				firstName: name,
				lastName: surname,
				password,
				email,
			};
			props.register(data);
			props.setLoaderVisible(true);
		}
	};

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.image}>
				<div className={cssClasses.inputs}>
					<span className={cssClasses.label}>{t(resources.register)}</span>
					<Input
						style={cssClasses.input}
						type={InputType.Text}
						changeHandler={newValue => { setName(newValue); }}
						placeholder={t(resources.name)}
						value={name}
						icon={InputIcon.User}
						validation={{
							type: ValidationType.Required,
							isValidCallback: isValid => {
								setInputsValid(draft => {
									draft.name = isValid;
								});
							},
							validate,
						}}
					/>
					<Input
						style={cssClasses.input}
						type={InputType.Text}
						changeHandler={newValue => { setSurname(newValue); }}
						placeholder={t(resources.surname)}
						value={surname}
						icon={InputIcon.User}
						validation={{
							type: ValidationType.Required,
							isValidCallback: isValid => {
								setInputsValid(draft => {
									draft.surname = isValid;
								});
							},
							validate,
						}}
					/>
					<Input
						style={cssClasses.input}
						type={InputType.Text}
						changeHandler={newValue => { setEmail(newValue); }}
						placeholder={t(resources.email)}
						value={email}
						icon={InputIcon.Mail}
						validation={{
							type: ValidationType.Email,
							isValidCallback: isValid => {
								setInputsValid(draft => {
									draft.email = isValid;
								});
							},
							validate,
						}}
					/>
					{renderPasswordInputs()}
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
		</div>
	);
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withTranslation(),
	withRouter,
)(RegisterPanel);

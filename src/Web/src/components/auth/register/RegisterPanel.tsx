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
import usePassword from "../passwordInput/PasswordInput";
import {
	StateProps,
	DispatchProps,
	mapStateToProps,
	mapDispatchToProps,
} from "../store/PropsTypes";

import "./RegisterPanel.scss";

export interface IRegisterFormData {
	name: string;
	surname: string;
	password: string;
	email: string;
}

interface IRegisterPanelProps extends IReactI18nProps, RouteComponentProps, StateProps, DispatchProps { }

const RegisterPanel = (props: IRegisterPanelProps) => {
	const { t } = props;
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [password, isPasswordValid, renderPasswordInputs] = usePassword(t);

	const cssClasses = {
		container: "form__container",
		inputs: "form__inputs"
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
		return isFormValid;
	};

	const onClickSubmit = () => {
		if (validateForm()) {
			const data: IRegisterFormData = {
				name,
				surname,
				password,
				email,
			};
			alert("OK!");
			// commented until API is ready
			// props.register(data);
		}
	};

	console.log(isPasswordValid);
	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.inputs}>
				<span>{t(resources.register)}</span>
				<Input
					type={InputType.Text}
					changeHandler={newValue => { setName(newValue); }}
					placeholder={t(resources.name)}
					value={name}
					icon={InputIcon.Globe}
				/>
				<Input
					type={InputType.Text}
					changeHandler={newValue => { setSurname(newValue); }}
					placeholder={t(resources.surname)}
					value={surname}
					icon={InputIcon.Code}
				/>
				<Input
					type={InputType.Text}
					changeHandler={newValue => { setEmail(newValue); }}
					placeholder={t(resources.email)}
					value={email}
					icon={InputIcon.Location}
				/>
				{renderPasswordInputs()}
				<Button
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

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withTranslation(),
	withRouter,
)(RegisterPanel);

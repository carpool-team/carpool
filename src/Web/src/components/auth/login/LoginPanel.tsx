import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import Button from "../../ui/button/Button";
import { ButtonBackground } from "../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../ui/button/enums/ButtonColor";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { InputIcon } from "../../ui/input/enums/InputIcon";
import { InputType } from "../../ui/input/enums/InputType";
import Input from "../../ui/input/Input";
import {
	StateProps,
	DispatchProps,
	mapStateToProps,
	mapDispatchToProps,
} from "../store/PropsTypes";

interface ILoginPanelProps extends IReactI18nProps, RouteComponentProps, StateProps, DispatchProps { }

export interface ILoginFormData {
	email: string;
	password: string;
	rememberLogin: boolean;
}

const LoginPanel = (props: ILoginPanelProps) => {
	const { t } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberLogin, setRememberLogin] = useState(false);

	const cssClasses = {
		container: "auth__container",
		inputs: "auth__inputs",
		label: "auth__inputs--label",
		input: "auth__inputs--input",
		button: "auth__inputs--button",
		image: "auth__image--login"
	};

	const resources = {
		login: "auth.login",
		email: "auth.loginPanel.email",
		password: "auth.loginPanel.password",
		submit: "auth.submit",
		rememberLogin: "auth.rememberLogin",
	};

	const inputKeys = {
		rememberPassword: "rememberPassword",
	};

	const validateForm = () => {
		let isFormValid: boolean = true;
		// validation here
		return isFormValid;
	};

	const onClickSubmit = () => {
		if (validateForm()) {
			const data: ILoginFormData = {
				password,
				email,
				rememberLogin
			};
			props.login(data);
		}
	};

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.image}>
				<div className={cssClasses.inputs}>
					<span className={cssClasses.label}>{t(resources.login)}</span>
					<Input
						style={cssClasses.input}
						type={InputType.Text}
						changeHandler={newValue => { setEmail(newValue); }}
						placeholder={t(resources.email)}
						value={email}
						icon={InputIcon.Mail}
					/>
					<Input
						style={cssClasses.input}
						type={InputType.Password}
						changeHandler={newValue => { setPassword(newValue); }}
						placeholder={t(resources.password)}
						value={password}
						icon={InputIcon.Password}
					/>
					<Input
						changeHandler={newValue => { setRememberLogin(newValue === "true"); }}
						value={String(rememberLogin)}
						type={InputType.Checkbox}
						label={{
							text: t(resources.rememberLogin),
							inputId: inputKeys.rememberPassword,
						}}
					/>
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
)(LoginPanel);

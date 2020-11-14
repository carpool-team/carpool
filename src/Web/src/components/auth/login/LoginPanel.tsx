import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import { ButtonBackground } from "../../NavBar/NavButton/enums/ButtonBackground";
import { ButtonColor } from "../../NavBar/NavButton/enums/ButtonColor";
import Button from "../../NavBar/NavButton/NavButton";
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
}

const LoginPanel = (props: ILoginPanelProps) => {
	const { t } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const cssClasses = {
		container: "form__container",
		inputs: "form__inputs"
	};

	const resources = {
		login: "auth.login",
		email: "auth.loginPanel.email",
		password: "auth.loginPanel.password",
		submit: "auth.submit",
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
			};
			alert("OK!");
			// commented until API is ready
			// props.login(data);
		}
	};

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.inputs}>
				<span>{t(resources.login)}</span>
				<Input
					type={InputType.Text}
					changeHandler={newValue => { setEmail(newValue); }}
					placeholder={t(resources.email)}
					value={email}
					icon={InputIcon.Code}
				/>
				<Input
					type={InputType.Password}
					changeHandler={newValue => { setPassword(newValue); }}
					placeholder={t(resources.password)}
					value={password}
					icon={InputIcon.Code}
				/>
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
)(LoginPanel);

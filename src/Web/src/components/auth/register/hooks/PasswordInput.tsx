import React, { useEffect } from "react";
import { useState } from "react";
import { InputType } from "../../../ui/input/enums/InputType";
import { InputIcon } from "../../../ui/input/enums/InputIcon";
import Input from "../../../ui/input/Input";
import PasswordStrengthBar from "react-password-strength-bar";
import i18n from "../../../../i18n";

const resources = {
	password: "auth.passwordInput.password",
	confirmPassword: "auth.passwordInput.confirmPassword",
	passwordsMismatch: "auth.passwordInput.passwordsMismatch",
	passwordTooWeak: "auth.passwordInput.passwordTooWeak",
	scoreWords: {
		short: "auth.passwordInput.scoreWords.short",
		weak: "auth.passwordInput.scoreWords.weak",
		okay: "auth.passwordInput.scoreWords.okay",
		good: "auth.passwordInput.scoreWords.good",
		strong: "auth.passwordInput.scoreWords.strong",
	},
};

const cssClasses = {
	input: "auth__inputs--input",
	bar: "auth__inputs--bar",
	validation: "auth__inputs--validation"
};

const usePassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [score, setScore] = useState(0);

	useEffect(() => {
		if (score === 4 && password === confirmPassword) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}, [password, confirmPassword]);

	const renderValidationMessage = () => {
		if (score === 4 && password !== confirmPassword) {
			return (
				<div className={cssClasses.validation}>
					<span >
						{i18n.t(resources.passwordsMismatch)}
					</span>
				</div>
			);
		} else if (score > 0 && score < 4) {
			return (
				<div className={cssClasses.validation}>
					<span >
						{i18n.t(resources.passwordTooWeak)}
					</span>
				</div>
			);
		} else {
			return null;
		}
	};

	const render = () => (
		<>
			<Input
				type={InputType.Password}
				changeHandler={(newValue: string) => { setPassword(newValue); }}
				placeholder={i18n.t(resources.password)}
				value={password}
				icon={InputIcon.Password}
			/>
			<PasswordStrengthBar
				className={cssClasses.bar}
				password={password}
				scoreWords={[
					i18n.t(resources.scoreWords.weak),
					i18n.t(resources.scoreWords.weak),
					i18n.t(resources.scoreWords.okay),
					i18n.t(resources.scoreWords.good),
					i18n.t(resources.scoreWords.strong),
				]}
				shortScoreWord={i18n.t(resources.scoreWords.short)}
				onChangeScore={s => { setScore(s); }}
			/>
			<Input
				style={cssClasses.input}
				type={InputType.Password}
				changeHandler={(newValue: string) => { setConfirmPassword(newValue); }}
				placeholder={i18n.t(resources.confirmPassword)}
				value={confirmPassword}
				icon={InputIcon.Password}
			/>
			{renderValidationMessage()}
		</>
	);
	return [password, isValid, render] as const;
};

export default usePassword;

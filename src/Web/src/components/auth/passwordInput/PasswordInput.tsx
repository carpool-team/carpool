import { TFunction } from "i18next";
import React, { useEffect } from "react";
import { useState } from "react";
import { InputIcon } from "../../ui/input/enums/InputIcon";
import { InputType } from "../../ui/input/enums/InputType";
import Input from "../../ui/input/Input";
import PasswordStrengthBar from "react-password-strength-bar";

const resources = {
	password: "auth.passwordInput.password",
	confirmPassword: "auth.passwordInput.confirmPassword",
	passwordsMismatch: "auth.passwordInput.passwordsMismatch",
	passwordTooWeak: "auth.passwordInput.passwordTooWeak",
};

const usePassword = (t: TFunction) => {
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
				<div>
					<span>
						{t(resources.passwordsMismatch)}
					</span>
				</div>
			);
		} else if (score > 0 && score < 4) {
			return (
				<div>
					<span>
						{t(resources.passwordTooWeak)}
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
				placeholder={t(resources.password)}
				value={password}
			/>
			<PasswordStrengthBar
				password={password}
				onChangeScore={s => { setScore(s); }}
			/>
			<Input
				type={InputType.Password}
				changeHandler={(newValue: string) => { setConfirmPassword(newValue); }}
				placeholder={t(resources.confirmPassword)}
				value={confirmPassword}
			/>
			{renderValidationMessage()}
		</>
	);
	return [password, isValid, render] as const;
};

export default usePassword;

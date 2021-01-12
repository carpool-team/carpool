import React, { useEffect } from "react";
import { useState } from "react";
import { InputType } from "../../input/enums/InputType";
import { InputIcon } from "../../input/enums/InputIcon";
import Input from "../../input/Input";
import PasswordStrengthBar from "react-password-strength-bar";
import i18n from "../../../../i18n";
import { useImmer } from "use-immer";

import "./UsePasswordWithConfirm.scss";

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
	rules: {
		length: "auth.passwordInput.rules.length",
		uppercase: "auth.passwordInput.rules.uppercase",
		lowercase: "auth.passwordInput.rules.lowercase",
		numbers: "auth.passwordInput.rules.numbers",
		special: "auth.passwordInput.rules.special",
	}
};

const regexes = {
	numbers: /^.*[0-9]+.*$/,
	uppercase: /^.*[A-Z]+.*$/,
	lowercase: /^.*?[a-z]+.*$/,
	special: /^.*?[#?!@$%^&*-]+.*$/,
	length: /^.{8,}$/,
};

const cssClasses = {
	input: "auth__inputs--input",
	validation: "auth__inputs--validation",
	ruleList: "passwords__ruleList",
	ruleListItem: "passwords__ruleListItem",
	ruleListItemNotSatisfied: "passwords__ruleListItem--notSatisfied",
	ruleListItemSatisified: "passwords__ruleListItem--satisfied",
};

const usePasswordWithConfirm = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [rulesSatisfied, setRulesSatisfied] = useImmer({
		length: false,
		uppercase: false,
		lowercase: false,
		numbers: false,
		special: false,
	});

	useEffect(() => {
		let valid: boolean = true;
		Object.keys(rulesSatisfied).forEach(key => {
			const isRuleSatisfied: boolean = regexes[key].test(password);
			if (isRuleSatisfied === false) {
				valid = false;
			}
			setRulesSatisfied(draft => { draft[key] = isRuleSatisfied; });
		});
		setIsValid(valid && password === confirmPassword);
	}, [password, confirmPassword]);

	const renderValidationMessage = () => {
		if (password && password !== confirmPassword) {
			return (
				<div className={cssClasses.validation}>
					<span>
						{i18n.t(resources.passwordsMismatch)}
					</span>
				</div>
			);
		} else {
			return null;
		}
	};

	const renderRuleList = () => {
		const items: JSX.Element[] = Object.keys(rulesSatisfied).map(key => {
			const satisfied: boolean = rulesSatisfied[key];
			const classnames = [cssClasses.ruleListItem, satisfied ? cssClasses.ruleListItemSatisified : cssClasses.ruleListItemNotSatisfied];
			return (
				<li key={key} className={classnames.join(" ")}>
					{i18n.t(resources.rules[key])}
				</li>
			);
		});
		return <ul className={cssClasses.ruleList}>{items}</ul>;
	};

	const render = () => (
		<>
			<Input
				style={cssClasses.input}
				type={InputType.Password}
				changeHandler={(newValue: string) => { setPassword(newValue); }}
				placeholder={i18n.t(resources.password)}
				value={password}
				icon={InputIcon.Password}
			/>
			{renderRuleList()}
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

export default usePasswordWithConfirm;

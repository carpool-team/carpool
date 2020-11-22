import React, { useEffect, useState } from "react";
import { InputType } from "./enums/InputType";
import { InputIcon } from "./enums/InputIcon";
import { getIconClass } from "./Helpers";
import { IValidation } from "./interfaces/IValidation";
import { ValidationType } from "./enums/ValidationType";

import "./Input.scss";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";

interface IINputProps extends IReactI18nProps {
	changeHandler: (newValue: string) => void;
	type: InputType;
	value: string;
	placeholder?: string;
	icon?: InputIcon;
	style?: string;
	validation?: IValidation;
}

const defaultValidationTextKeys = {
	[ValidationType.Email]: "input.validation.emailInvalid",
	[ValidationType.Required]: "input.validation.fieldRequired",
};

const regexes = {
	[ValidationType.Email]: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	[ValidationType.PostalCode]: /^\d{2}\-\d{3}$/,
};

const validateInput = (value: string, type: ValidationType, customValidation?: (value: string) => boolean) => {
	if (type === ValidationType.Custom && !customValidation) {
		throw "Custom validation not provided!";
	}
	switch (type) {
		case ValidationType.Email:
			return regexes[type].test(value);
		case ValidationType.Required:
			return Boolean(value);
		case ValidationType.Custom:
			return customValidation(value);
		default:
			return true;
	}
};

const Input = (props: IINputProps) => {
	const [isValid, setIsValid] = useState(true);

	useEffect(() => {
		if (props.validation) {
			const valid: boolean = validateInput(props.value, props.validation.type, props.validation.customValidation);
			setIsValid(valid);
			if (props.validation.isValidCallback) {
				props.validation.isValidCallback(valid);
			}
		}
	}, [props.value]);

	const inputBaseClassName: string = "input__input";
	const inputInvalidClassName: string = "input__input--invalid";
	const inputInvalidContainerClassName: string = "input__container--invalid";
	const inputInvalidTextClassName: string = "input__invalidText";
	const inputBaseContainerClassName: string = "input__container input__container::before--user";
	const inputGroupContainerClassName: string = "input__groupContainer";

	const generalChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.changeHandler(event.target.value);
	};

	const baseInputClasses = [inputBaseClassName];
	const baseContainerClasses = [inputBaseContainerClassName];
	if (!isValid) {
		baseInputClasses.push(inputInvalidClassName);
		baseContainerClasses.push(inputInvalidContainerClassName);
	}

	const renderValidationMessage = () => {
		const { t } = props;
		if (!isValid) {
			return (
				<span className={inputInvalidTextClassName}>
					{props.validation.validationText ?? t(defaultValidationTextKeys[props.validation?.type])}
				</span>
			);
		} else {
			return null;
		}
	};

	const renderTextInput = () => (
		<div className={inputGroupContainerClassName}>
			<div className={baseContainerClasses.join(" ")}>
				<div className={getIconClass(props.icon)}></div>
				<input
					className={baseInputClasses.join(" ")}
					placeholder={props.placeholder}
					onChange={generalChangeHandler}
					value={props.value}
				/>
			</div>
			{renderValidationMessage()}
		</div>
	);

	const renderInput = () => {
		switch (props.type) {
			case InputType.Text:
				return renderTextInput();
			default:
				throw "Unhandled input type";
		}
	};

	return (
		<>
			{renderInput()}
		</>
	);
};

export default withTranslation()(Input);

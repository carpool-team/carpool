import React from "react";
import { InputType } from "./enums/InputType";
import { InputIcon } from "./enums/InputIcon";
import { getIconClass } from "./Helpers";

import "./Input.scss";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";

interface IINputProps extends IReactI18nProps {
	changeHandler: (newValue: string) => void;
	type: InputType;
	value: string;
	placeholder?: string;
	commment?: string;
	icon?: InputIcon;
	style?: string;
	label?: {
		text: string;
		inputId: string;
	};
}

const Input = (props: IINputProps) => {
	const inputBaseClassName: string = "input__input";
	const inputBaseClassContainer: string = "input__container input__container::before--user";
	const inputCommentClassName: string = "input__comment";

	const generalChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (props.type === InputType.Checkbox) {
			props.changeHandler(String(event.target.checked));
		} else {
			props.changeHandler(event.target.value);
		}
	};

	const renderTextInput = () => (
		<div className={[inputBaseClassContainer, props.style].join(" ")}>
			<div className={getIconClass(props.icon)}></div>
			<input
				className={inputBaseClassName}
				placeholder={props.placeholder}
				onChange={generalChangeHandler}
				value={props.value}
			/>
		</div>
	);

	const renderPasswordInput = () => (
		<div className={[inputBaseClassContainer, props.style].join(" ")}>
			<div className={getIconClass(props.icon)}></div>
			<input
				className={inputBaseClassName}
				placeholder={props.placeholder}
				onChange={generalChangeHandler}
				value={props.value}
				type={"password"}
			/>
		</div>
	);

	const renderCheckbox = () => (
		<div>
			<input
				className={inputBaseClassName}
				placeholder={props.placeholder}
				onChange={generalChangeHandler}
				value={props.value}
				type={"checkbox"}
				id={props.label?.inputId}
			/>
			{props.label ? <label htmlFor={props.label.inputId}>{props.label.text}</label> : null}
		</div>
	);

	const renderInput = () => {
		switch (props.type) {
			case InputType.Text:
				return renderTextInput();
			case InputType.Password:
				return renderPasswordInput();
			case InputType.Checkbox:
				return renderCheckbox();
			default:
				throw "Unhandled input type";
		}
	};

	const renderComment = () => {
		if (props.commment) {
			return (
				<span className={inputCommentClassName}>
					{props.commment}
				</span>
			);
		} else {
			return null;
		}
	};

	return (
		<>
			{renderInput()}
			{renderComment()}
		</>
	);
};

export default withTranslation()(Input);

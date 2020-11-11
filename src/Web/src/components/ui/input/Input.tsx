import React from "react";
import { InputType } from "./enums/InputType";
import {InputIcon} from "./enums/InputIcon"
import {getIconClass} from "./Helpers"

import "./Input.scss";
import { from } from "rxjs";

interface IINputProps {
	changeHandler: (newValue: string) => void;
	type: InputType;
	value: string;
	placeholder?: string;
	commment?: string;
	icon?: InputIcon
}

const Input = (props: IINputProps) => {
	const inputBaseClassName: string = "input__input";
	const inputBaseClassContainer: string = "input__container input__container::before--user";
	const inputCommentClassName: string = "input__comment";
	const inputBaseClassIcon:string = "input__icon";

	const generalChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.changeHandler(event.target.value);
	};

	const renderTextInput = () => (
		<div className ={inputBaseClassContainer}>
		<div className = {getIconClass(props.icon)}></div>
		<input
			className={inputBaseClassName}
			placeholder={props.placeholder}
			onChange={generalChangeHandler}
			value={props.value}
		/>
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

export default Input;

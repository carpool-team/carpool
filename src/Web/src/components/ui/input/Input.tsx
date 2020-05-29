import React from "react";
import { InputType } from "./enums/InputType";

import "./Input.scss";

interface IINputProps {
	changeHandler: (newValue: string) => void;
	type: InputType;
	value: string;
	placeholder?: string;
	commment?: string;
}

const Input = (props: IINputProps) => {
	const inputBaseClassName: string = "input";
	const inputCommentClassName: string = "input__comment";

	const generalChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.changeHandler(event.target.value);
	};

	const renderTextInput = () => (
		<input
			className={inputBaseClassName}
			placeholder={props.placeholder}
			onChange={generalChangeHandler}
			value={props.value}
		/>
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

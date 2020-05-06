import React from "react";
import { InputType } from "./enums/InputType";

interface IINputProps {
	changeHandler: (newValue: string) => void;
	type: InputType;
	value: string;
}

const Input = (props: IINputProps) => {
	const generalChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.changeHandler(event.target.value);
	};

	const renderTextInput = () => (
		<input onChange={generalChangeHandler} />
	);

	switch (props.type) {
		case InputType.Text:
			return renderTextInput();
		default:
			throw "Unhandled input type";
	}
};

export default Input;

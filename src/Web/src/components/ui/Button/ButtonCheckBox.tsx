import React, { FunctionComponent, useState } from "react";
import { ButtonSize } from "./enums/ButtonSize";
import { ButtonType } from "./enums/ButtonType";
import { ButtonShape } from "./enums/ButtonShape";
import { getSizeClass, getTypeClass, getShapeClass } from "./Helpers";

import "./Button.scss";

interface IButtonLinkProps {
	size: ButtonSize;
	type: ButtonType;
	shape?: ButtonShape;
	label: string;
}

const ButtonCheckBox: FunctionComponent<IButtonLinkProps> = (props) => {
	const baseCssClass: string = "button button--checkbox";
	const cssClasses: string = [
		baseCssClass,
		getShapeClass(props.shape),
		getSizeClass(props.size),
		getTypeClass(props.type),
	].join(" ");

	const [active, setActive] = useState(false);

	return (
		<>
			<button
				className={cssClasses + (!active ? "button--checkbox_active" : "")}
				onClick={!active ? () => setActive(true) : () => setActive(false)}
			></button>
			<div className={"button--checkbox-label"}>{props.label}</div>
		</>
	);
};

export default ButtonCheckBox;

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
	active: boolean;
	onClick: (newValue: boolean) => void;
}

const ButtonCheckBox: FunctionComponent<IButtonLinkProps> = (props) => {
	const baseCssClass: string = "button button--checkbox";
	const activeCssClass: string = "button--checkbox_active";
	const labelCssClass: string = "button--checkbox-label";
	const cssClasses: string[] = [
		baseCssClass,
		getShapeClass(props.shape),
		getSizeClass(props.size),
		getTypeClass(props.type),
	];
	if (props.active) {
		cssClasses.push(activeCssClass);
	}
	return (
		<>
			<button
				className={cssClasses.join(" ")}
				onClick={() => props.onClick(!props.active)}
			></button>
			<div className={labelCssClass}>{props.label}</div>
		</>
	);
};

export default ButtonCheckBox;

import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ButtonSize } from "./enums/ButtonSize";
import { ButtonType } from "./enums/ButtonType";
import { ButtonShape } from "./enums/ButtonShape";
import { getSizeClass, getTypeClass, getShapeClass } from "./Helpers";

import "./Button.scss";

interface IButtonLinkProps {
	size: ButtonSize;
	type: ButtonType;
	shape?: ButtonShape;
	to: string;
}

const ButtonLink: FunctionComponent<IButtonLinkProps> = (props) => {
	const baseCssClass: string = "button button--link";
	const cssClasses: string = [
		baseCssClass,
		getShapeClass(props.shape),
		getSizeClass(props.size),
		getTypeClass(props.type),
	].join(" ");

	return (
		<Link to={props.to} className={cssClasses}>
			{props.children}
		</Link>
	);
};

export default ButtonLink;

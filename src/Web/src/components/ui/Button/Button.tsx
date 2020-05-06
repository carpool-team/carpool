import React, { FunctionComponent } from "react";
import { ButtonSize } from "./enums/ButtonSize";
import { ButtonType } from "./enums/ButtonType";
import { getSizeClass, getTypeClass } from "./Helpers";

import "./Button.scss";

interface IButtonProps {
	size?: ButtonSize;
	type?: ButtonType;
	onClick?: () => void;
}

const Button: FunctionComponent<IButtonProps> = (props) => {
	const btnClick = (event: React.MouseEvent) => {
		if (props.onClick) {
			props.onClick();
		} else {
			event.preventDefault();
		}
	};

	const baseCssClass: string = "button";
	const cssClasses: string = [baseCssClass, getSizeClass(props.size), getTypeClass(props.type)].join(" ");

	return (
		<button
			className={cssClasses}
			onClick={btnClick}
		>
			{props.children}
		</button>
	);
};

export default Button;

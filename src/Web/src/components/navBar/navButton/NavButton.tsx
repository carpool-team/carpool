import React, { FunctionComponent } from "react";
import { ButtonColor } from "./enums/ButtonColor";
import { ButtonBackground } from "./enums/ButtonBackground";
import { ButtonIcon } from "./enums/ButtonIcon";
import { getBackgroundClass, getColorClass, getIconClass } from "./Helpers";

import "./NavButton.scss";

interface IButtonProps {
	color?: ButtonColor;
	background?: ButtonBackground;
	icon?: ButtonIcon;
	onClick?: () => void;
	to?: string;
}

const Button: FunctionComponent<IButtonProps> = (props) => {
	const btnClick = (event: React.MouseEvent) => {
		if (props.onClick) {
			props.onClick();
		} else {
			event.preventDefault();
		}
	};

	const baseCssClass: string = "navButton";
	const cssClasses: string = [
		baseCssClass,
		getColorClass(props.color),
		getBackgroundClass(props.background),
		getIconClass(props.icon)
	].join(" ");

	return (
		<a href={props.to ?? "#"} className={cssClasses} onClick={btnClick}>
			{props.children}
		</a>
	);
};

export default Button;

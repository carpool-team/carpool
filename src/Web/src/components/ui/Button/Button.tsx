import React, { FunctionComponent } from "react";
import { ButtonColor } from "./enums/ButtonColor";
import {ButtonBackground} from "./enums/ButtonBackground";
import {ButtonIcon} from "./enums/ButtonIcon";
import { getBackgroundClass, getColorClass, getIconClass } from "./Helpers";
import { from } from "rxjs";
import "./Button.scss";

interface IButtonLinkProps {
	color?: ButtonColor;
	background?: ButtonBackground;
	icon?: ButtonIcon;
	onClick?: () => void;
	id?: string;
	className?: string;
	style?: string;
}

const Button: FunctionComponent<IButtonLinkProps> = (props) => {

	const btnClick = (event: React.MouseEvent) => {
		if (props.onClick) {
			props.onClick();
		} else {
			event.preventDefault();
		}
	};

	const baseCssClass: string = "button";
	const cssClasses: string = [
		baseCssClass,
		props.className,
		getColorClass(props.color),
		getBackgroundClass(props.background),
		getIconClass(props.icon),
	].join(" ");

	return (
		<button id={props.id} className={[cssClasses, props.style].join(" ")} onClick={btnClick}>
			{props.children}
		</button>
	);
};

export default Button;

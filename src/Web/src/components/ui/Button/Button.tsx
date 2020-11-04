import React, { FunctionComponent } from "react";
import { ButtonColor } from "./enums/ButtonColor";
import {ButtonBackground} from "./enums/ButtonBackground"
import {ButtonIcon} from "./enums/ButtonIcon"
import { getBackgroundClass, getColorClass, getIconClass } from "./Helpers";
import { from } from "rxjs";
import "./Button.scss";

interface IButtonLinkProps {
	color?:ButtonColor;
	background?:ButtonBackground;
	icon?:ButtonIcon;
	onClick?: () => void;
}

const Button: FunctionComponent<IButtonLinkProps> = (props) => {

	const btnClick = (event: React.MouseEvent) => {
		if (props.onClick) {
			props.onClick();
		} else {
			event.preventDefault();
		}
	};

	const baseCssClass: string = "buttonLink";
	const cssClasses: string = [
		baseCssClass,
		getColorClass(props.color),
		getBackgroundClass(props.background),
		getIconClass(props.icon),
	].join(" ");

	return (
		<button  className={cssClasses} onClick={btnClick}>
			{props.children}
		</button>
	);
};

export default Button;

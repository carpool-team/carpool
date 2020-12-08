import React, { FunctionComponent } from "react";
import { ButtonSmallColor } from "./enums/ButtonSmallColor";
import {ButtonSmallBackground} from "./enums/ButtonSmallBackground";
import {ButtonSmallIcon} from "./enums/ButtonSmallIcon";
import { getBackgroundClass, getColorClass, getIconClass } from "./Helpers";
import { from } from "rxjs";
import "./ButtonSmall.scss";

interface IButtonIconsProps {
	color?: ButtonSmallColor;
	background?: ButtonSmallBackground;
	icon?: ButtonSmallIcon;
	onClick?: () => void;
	id?: string;
	className?: string;
	style?: string;
}

const Button: FunctionComponent<IButtonIconsProps> = (props) => {

	const btnClick = (event: React.MouseEvent) => {
		if (props.onClick) {
			props.onClick();
		} else {
			event.preventDefault();
		}
	};

	const baseCssClass: string = "buttonSmall";
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

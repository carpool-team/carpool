import React, { FunctionComponent } from "react";
import { ButtonColor } from "./enums/ButtonColor";
import { ButtonBackground } from "./enums/ButtonBackground";
import { ButtonIcon } from "./enums/ButtonIcon";
import { getBackgroundClass, getColorClass, getIconClass } from "./Helpers";

import "./Button.scss";

interface IButtonLinkProps {
	color?: ButtonColor;
	background?: ButtonBackground;
	icon?: ButtonIcon;
	onClick?: () => void;
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	additionalCssClass?: string;
	type?: "submit" | "reset" | "button";
	buttonRef?: React.LegacyRef<HTMLButtonElement>;
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
	const cssClasses: string[] = [
		baseCssClass,
		props.className,
		getColorClass(props.color),
		getBackgroundClass(props.background),
		getIconClass(props.icon),
	];
	if (props.additionalCssClass) {
		cssClasses.push(props.additionalCssClass);
	}

	return (
		<button
			id={props.id}
			style={props.style}
			className={cssClasses.join(" ")}
			onClick={btnClick}
			type={props.type}
			ref={props.buttonRef}
		>
			{props.children}
		</button>
	);
};

export default Button;

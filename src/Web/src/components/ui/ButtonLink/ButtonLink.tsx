import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ButtonLinkColor } from "./enums/ButtonLinkColor";
import { ButtonLinkBackground } from "./enums/ButtonLinkBackground";
import { ButtonLinkIcon } from "./enums/ButtonLinkIcon";
import { ButtonLinkUnderline } from "./enums/ButtonLinkUndeline";
import { ButtonLinkStyle } from "./enums/ButtonLinkStyle";
import { getBackgroundClass, getColorClass, getIconClass, getUnderlineClass, getStyleClass } from "./Helpers";
import { from } from "rxjs";
import "./ButtonLink.scss";

interface IButtonLinkProps {
	color?: ButtonLinkColor;
	background?: ButtonLinkBackground;
	icon?: ButtonLinkIcon;
	undeline?: ButtonLinkUnderline;
	onClick?: () => void;
	to?: string;
	style?: ButtonLinkStyle;
}

const ButtonLink: FunctionComponent<IButtonLinkProps> = (props) => {

	const btnClick = (event: React.MouseEvent) => {
		if (props.onClick) {
			props.onClick();
		} else {
			// event.preventDefault();
		}
	};

	const baseCssClass: string = "buttonLink";
	const cssClasses: string = [
		baseCssClass,
		getColorClass(props.color),
		getBackgroundClass(props.background),
		getIconClass(props.icon),
		getUnderlineClass(props.undeline),
		getStyleClass(props.style)
	].join(" ");

	return (
		<Link to={props.to ?? "#"} className={cssClasses} onClick={btnClick}>
			{props.children}
		</Link>
	);
};

export default ButtonLink;

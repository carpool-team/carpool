import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ButtonColor } from "./enums/ButtonColor";
import {ButtonBackground} from "./enums/ButtonBackground"
import {ButtonIcon} from "./enums/ButtonIcon"
import {ButtonUnderline} from "./enums/ButtonUndeline"
import { getBackgroundClass, getColorClass, getIconClass, getUnderlineClass } from "./Helpers";
import { from } from "rxjs";
import "./ButtonLink.scss";

interface IButtonLinkProps {
	color?:ButtonColor;
	background?:ButtonBackground;
	icon?:ButtonIcon;
	undeline?:ButtonUnderline;
	onClick?: () => void;
	to?:string;
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
		getUnderlineClass(props.undeline)
	].join(" ");

	return (
		<Link to={props.to}  className={cssClasses} onClick={btnClick}>
			{props.children}
		</Link>
	);
};

export default ButtonLink;

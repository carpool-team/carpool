import React, { FunctionComponent, useState } from "react";
import { ButtonSize } from "./enums/ButtonSize";
import { ButtonType } from "./enums/ButtonType";
import { ButtonShape } from "./enums/ButtonShape";
import { getSizeClass, getTypeClass, getShapeClass } from "./Helpers";
import userIco from "assets_path/img/user_ico.png";
import driverIco from "assets_path/img/driver_ico.png";

import "./Button.scss";

interface IButtonJoinProps {
	size: ButtonSize;
	type: ButtonType;
	shape?: ButtonShape;
	owner: boolean;
	label: string;
	additionalJoinOnClick?: () => void;
}

const ButtonJoin: FunctionComponent<IButtonJoinProps> = (props) => {
	const baseCssClass: string = "button button--checkbox_noContent";
	const checkboxLabelCssClass: string = "button--join-label";
	const acceptCssClass: string = "fa fa-plus";
	const icoCssClass: string = "button--userIco";

	const buttonCssClasses: string = [
		baseCssClass,
		getShapeClass(props.shape),
		getSizeClass(props.size),
		getTypeClass(props.type),
	].join(" ");

	const [join, setJoin] = useState(true);

	const joinOnClick = () => {
		setJoin(!join);
		if (props.additionalJoinOnClick) {
			props.additionalJoinOnClick();
		}
	};

	return (
		<>
			<button
				className={buttonCssClasses + (!join ? acceptCssClass : "")}
				onClick={joinOnClick}
			>
				<i className={acceptCssClass} aria-hidden={true}></i>
			</button>
			{props.owner ? (
				<img className={icoCssClass} src={userIco} alt={""} />
			) : (
					<img className={icoCssClass} src={driverIco} alt={""} />
				)}
			<div className={checkboxLabelCssClass}>{props.label}</div>
		</>
	);
};

export default ButtonJoin;

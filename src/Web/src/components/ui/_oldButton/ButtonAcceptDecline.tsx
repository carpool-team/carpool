import React, { FunctionComponent, useState } from "react";
import { ButtonSize } from "./enums/ButtonSize";
import { ButtonType } from "./enums/ButtonType";
import { ButtonShape } from "./enums/ButtonShape";
import { getSizeClass, getTypeClass, getShapeClass } from "./Helpers";

import "./Button.scss";

interface IButtonLinkProps {
	size: ButtonSize;
	type: ButtonType;
	shape?: ButtonShape;
	label: string;
	additionalDeclineOnClick?: () => void;
	additionalAcceptOnClick?: () => void;
}

const ButtonCheckBox: FunctionComponent<IButtonLinkProps> = (props) => {
	const baseCssClass: string = "button button--checkbox_noContent";
	const activeCssClass: string = "button--checkbox_active";
	const checkboxLabelCssClass: string = "button--checkbox-label";
	const acceptCssClass: string = "fa fa-check";
	const declineCssClass: string = "fa fa-times";

	const buttonCssClasses: string = [
		baseCssClass,
		getShapeClass(props.shape),
		getSizeClass(props.size),
		getTypeClass(props.type),
	].join(" ");

	const [activeAccept, setActiveAccept] = useState(true);
	const [activeDecline, setActiveDecline] = useState(true);


	const acceptOnClick = () => {
		setActiveAccept(!activeAccept);
		if (props.additionalAcceptOnClick) {
			props.additionalAcceptOnClick();
		}
	};

	const declineOnClick = () => {
		setActiveDecline(!activeAccept);
		if (props.additionalDeclineOnClick) {
			props.additionalDeclineOnClick();
		}
	};

	return (
		<>
			<button
				className={
					buttonCssClasses + (!activeAccept ? activeCssClass : "")
				}
				onClick={acceptOnClick}
			>
				<i className={acceptCssClass} aria-hidden={true}></i>
			</button>
			<button
				className={
					buttonCssClasses + (!activeDecline ? activeCssClass : "")
				}
				onClick={declineOnClick}
			>
				<i className={declineCssClass} aria-hidden={true}></i>
			</button>
			<div className={checkboxLabelCssClass}>{props.label}</div>
		</>
	);
};

export default ButtonCheckBox;

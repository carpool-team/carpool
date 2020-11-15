import { ButtonColor } from "./enums/ButtonColor";
import {ButtonBackground} from "./enums/ButtonBackground";
import {ButtonIcon} from "./enums/ButtonIcon";

export const getColorClass: (type?: ButtonColor) => string = (color) => {
	switch (color) {
		case ButtonColor.Green:
			return "button__text--green";
		case ButtonColor.Blue:
			return "button__text--blue";
		case ButtonColor.Gray:
			return "button__text--gray";
		case ButtonColor.White:
			return "button__text--white";
		case ButtonColor.Black:
				return "button__text--black";
		default:
			return "button__text--gray";
	}
};

export const getBackgroundClass: (type?: ButtonBackground) => string = (background) => {
	switch (background) {
		case ButtonBackground.Tansparent:
			return "button__background--white";
		case ButtonBackground.Gray:
			return "button__background--gray";
		case ButtonBackground.Blue:
			return "button__background--blue";
		case ButtonBackground.Green:
			return "button__background--green";
		default:
			return "button__background--transparent";
	}
};
export const getIconClass: (type?: ButtonIcon) => string = (icon) => {
	switch (icon) {
		case ButtonIcon.User:
			return "button__icon--user";
		default:
			return "button__icon--none";
	}
};

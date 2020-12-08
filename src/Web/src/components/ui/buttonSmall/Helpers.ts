import { ButtonSmallColor } from "./enums/ButtonSmallColor";
import {ButtonSmallBackground} from "./enums/ButtonSmallBackground";
import {ButtonSmallIcon} from "./enums/ButtonSmallIcon";

export const getColorClass: (type?: ButtonSmallColor) => string = (color) => {
	switch (color) {
		case ButtonSmallColor.Green:
			return "buttonSmall__text--green";
		case ButtonSmallColor.Blue:
			return "buttonSmall__text--blue";
		case ButtonSmallColor.Gray:
			return "buttonSmall__text--gray";
		case ButtonSmallColor.White:
			return "buttonSmall__text--white";
		case ButtonSmallColor.Black:
				return "buttonSmall__text--black";
		default:
			return "buttonSmall__text--gray";
	}
};

export const getBackgroundClass: (type?: ButtonSmallBackground) => string = (background) => {
	switch (background) {
		case ButtonSmallBackground.Tansparent:
			return "buttonSmall__background--white";
		case ButtonSmallBackground.Gray:
			return "buttonSmall__background--gray";
		case ButtonSmallBackground.Blue:
			return "buttonSmall__background--blue";
		case ButtonSmallBackground.Green:
			return "buttonSmall__background--green";
		case ButtonSmallBackground.White:
			return "buttonSmall__background--white";
		default:
			return "buttonSmall__background--transparent";
	}
};
export const getIconClass: (type?: ButtonSmallIcon) => string = (icon) => {
	switch (icon) {
		case ButtonSmallIcon.User:
			return "buttonSmall__icon--user";
		case ButtonSmallIcon.Close:
			return "buttonSmall__icon--close";
		default:
			return "buttonSmall__icon--none";
	}
};

import { from } from "rxjs";
import { ButtonColor } from "./enums/ButtonColor";
import {ButtonBackground} from "./enums/ButtonBackground";
import {ButtonIcon} from "./enums/ButtonIcon";

export const getColorClass: (type?: ButtonColor) => string = (color) => {
	switch (color) {
		case ButtonColor.Green:
			return "navButton--textGreen";
		case ButtonColor.Blue:
			return "navButton--textBlue";
		case ButtonColor.Gray:
			return "navButton--textGray";
		case ButtonColor.White:
			return "navButton--textWhite";
		default:
			return "navButton--textGray";
	}
};

export const getBackgroundClass: (type?: ButtonBackground) => string = (background) => {
	switch (background) {
		case ButtonBackground.Tansparent:
			return "navButton--backgroundTransparent";
		case ButtonBackground.Gray:
			return "navButton--backgroundGray";
		case ButtonBackground.None:
			return "navButton--backgroundNone";
		case ButtonBackground.Blue:
				return "navButton--backgroundBlue";
		default:
			return "navButton--backgroundNone";
	}
};
export const getIconClass: (type?: ButtonIcon) => string = (icon) => {
	switch (icon) {
		case ButtonIcon.User:
			return "navButton--userIcon";
		default:
			return "";
	}
};

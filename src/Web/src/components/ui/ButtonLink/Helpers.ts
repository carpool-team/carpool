import { from } from "rxjs";
import { ButtonColor } from "./enums/ButtonColor";
import {ButtonBackground} from "./enums/ButtonBackground"
import {ButtonIcon} from "./enums/ButtonIcon"
import {ButtonUnderline} from "./enums/ButtonUndeline"

export const getColorClass: (type?: ButtonColor) => string = (color) => {
	switch (color) {
		case ButtonColor.Green:
			return "buttonLink__text--green";
		case ButtonColor.Blue:
			return "buttonLink__background--blue";
		case ButtonColor.Gray:
			return "buttonLink__background--gray";
		case ButtonColor.White:
			return "buttonLink__background--white"
		default:
			return "buttonLink__background--gray";
	}
};

export const getBackgroundClass: (type?: ButtonBackground) => string = (background) => {
	switch (background) {
		case ButtonBackground.Tansparent:
			return "buttonLink__background--white";
		case ButtonBackground.Gray:
			return "buttonLink__background--gray";
		case ButtonBackground.Blue:
			return "buttonLink__background--blue";
		case ButtonBackground.Green:
			return "buttonLink__background--green";
		default:
			return "buttonLink__background--transparent";
	}
};
export const getIconClass: (type?: ButtonIcon) => string = (icon) => {
	switch (icon) {
		case ButtonIcon.User:
			return "buttonLink__icon--user";
		default:
			return "buttonLink__icon--none";
	}
}
export const getUnderlineClass: (type?: ButtonUnderline) => string = (underline) => {
	switch (underline) {
		case ButtonUnderline.Solid:
			return "buttonLink__underline--solid";
		default:
			return "buttonLink__underline--none";
	}
};

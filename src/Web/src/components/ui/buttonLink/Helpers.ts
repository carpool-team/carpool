import { ButtonLinkColor } from "./enums/ButtonLinkColor";
import { ButtonLinkBackground } from "./enums/ButtonLinkBackground";
import { ButtonLinkIcon } from "./enums/ButtonLinkIcon";
import { ButtonLinkUnderline } from "./enums/ButtonLinkUnderline";
import { ButtonLinkStyle } from "./enums/ButtonLinkStyle";

export const getColorClass: (type?: ButtonLinkColor) => string = (color) => {
	switch (color) {
		case ButtonLinkColor.Green:
			return "buttonLink__text--green";
		case ButtonLinkColor.Blue:
			return "buttonLink__text--blue";
		case ButtonLinkColor.Gray:
			return "buttonLink__text--gray";
		case ButtonLinkColor.White:
			return "buttonLink__text--white";
		default:
			return "buttonLink__text--gray";
	}
};

export const getBackgroundClass: (type?: ButtonLinkBackground) => string = (background) => {
	switch (background) {
		case ButtonLinkBackground.Tansparent:
			return "buttonLink__background--white";
		case ButtonLinkBackground.Gray:
			return "buttonLink__background--gray";
		case ButtonLinkBackground.Blue:
			return "buttonLink__background--blue";
		case ButtonLinkBackground.Green:
			return "buttonLink__background--green";
		case ButtonLinkBackground.GrayDark:
			return "buttonLink__background--grayDark";
		default:
			return "buttonLink__background--transparent";
	}
};
export const getIconClass: (type?: ButtonLinkIcon) => string = (icon) => {
	switch (icon) {
		case ButtonLinkIcon.User:
			return "buttonLink__icon--user";
		default:
			return "buttonLink__icon--none";
	}
};
export const getUnderlineClass: (type?: ButtonLinkUnderline) => string = (underline) => {
	switch (underline) {
		case ButtonLinkUnderline.Solid:
			return "buttonLink__underline--solid";
		default:
			return "buttonLink__underline--none";
	}
};
export const getStyleClass: (type?: ButtonLinkStyle) => string = (style) => {
	switch (style) {
		case ButtonLinkStyle.Link:
			return "buttonLink";
		case ButtonLinkStyle.Button:
			return "button";
		default:
			return "buttonLink";
	}
};

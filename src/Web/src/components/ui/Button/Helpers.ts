import { ButtonSize } from "./enums/ButtonSize";
import { ButtonType } from "./enums/ButtonType";

export const getSizeClass: (size?: ButtonSize) => void = (size) => {
	switch (size) {
		case ButtonSize.Large:
			return "button--large";
		default:
			return "button--standard";
	}
};
export const getTypeClass: (type?: ButtonType) => void = (type) => {
	switch (type) {
		case ButtonType.Danger:
			return "button--danger";
		case ButtonType.Info:
			return "button--info";
		case ButtonType.Success:
			return "button--success";
		default:
			return "";
	}
};
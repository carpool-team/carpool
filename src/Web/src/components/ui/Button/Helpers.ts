import { ButtonSize } from "./enums/ButtonSize";
import { ButtonType } from "./enums/ButtonType";

export const getSizeClass: (size: ButtonSize) => void = (size) => {
	switch (size) {
		case ButtonSize.Large:
			return "button--large";
		case ButtonSize.Standard:
			return "button--standard";
		default:
			throw "Unhandled button size";
	}
};
export const getTypeClass: (type: ButtonType) => void = (type) => {
	switch (type) {
		case ButtonType.Danger:
			return "button--danger";
		case ButtonType.Info:
			return "button--info";
		case ButtonType.Standard:
			return "";
		case ButtonType.Success:
			return "button--success";
		default:
			throw "Unhandled button size";
	}
};
import { InputIcon } from "./enums/InputIcon";

export const getIconClass: (type?: InputIcon) => string = (icon) => {
	switch (icon) {
		case InputIcon.User:
			return "input__user";
		case InputIcon.Mail:
			return "input__mail";
		case InputIcon.Code:
			return "input__code";
		case InputIcon.Location:
			return "input__location";
		case InputIcon.Globe:
			return "input__globe";
		default:
			return "";
	}
};

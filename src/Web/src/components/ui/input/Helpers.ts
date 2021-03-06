import { InputIcon } from "./enums/InputIcon";

const baseIconClass: string = "input__icon";

export const getIconClass: (type?: InputIcon) => string = (icon) => {
	switch (icon) {
		case InputIcon.User:
			return `${baseIconClass} ${baseIconClass}--user`;
		case InputIcon.Mail:
			return `${baseIconClass} ${baseIconClass}--mail`;
		case InputIcon.Code:
			return `${baseIconClass} ${baseIconClass}--code`;
		case InputIcon.Location:
			return `${baseIconClass} ${baseIconClass}--location`;
		case InputIcon.Globe:
			return `${baseIconClass} ${baseIconClass}--globe`;
		case InputIcon.Password:
			return `${baseIconClass} ${baseIconClass}--password`;
		case InputIcon.Seats:
			return `${baseIconClass} ${baseIconClass}--seats`;
		case InputIcon.Search:
			return `${baseIconClass} ${baseIconClass}--search`;
		default:
			return "";
	}
};

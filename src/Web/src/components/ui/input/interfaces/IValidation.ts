import { ValidationType } from "../enums/ValidationType";

export interface IValidation {
	type: ValidationType;
	isValidCallback: (isValid: boolean) => void;
	validationText?: string;
	customValidation?: (value: string) => boolean;
}

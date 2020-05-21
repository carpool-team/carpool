import { IFormUserData } from "./IFormUserData";
import { IFormGroupData } from "./IFormGroupData";

/** Form data pending */
export interface IFormData {
	/** Pending group data */
	group: IFormGroupData;
	/** Pending user data */
	user: IFormUserData;
	/** Users added */
	users: IFormUserData[];
	/** Form's step */
	step: number;
}

/** Initial data for use in form component */
export const initialFormData: IFormData = {
	group: {
		address: "",
		code: "",
		groupName: "",
	},
	user: {
		name: "",
		surname: "",
		email: "",
	},
	users: [],
	step: 1,
};
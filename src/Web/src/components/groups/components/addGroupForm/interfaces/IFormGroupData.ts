import { ILocation } from "../../../interfaces/ILocation";

/** Group data to add in form interface */
export interface IFormGroupData extends ILocation {
	/** Group name */
	groupName: string;
	/** Group address */
	address: string;
	/** Group code */
	code: string;
}

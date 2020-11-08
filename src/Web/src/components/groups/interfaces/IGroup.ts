import { IGroupBase } from "./IGroupBase";

/** Group interface */
export interface IGroup extends IGroupBase {
	code: string;
	owner: string;
	userCount: number;
	selected?: boolean;
}

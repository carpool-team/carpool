import { IGroupBase } from "./IGroupBase";
import { IGroupUser } from "./IGroupUser";

/** Group interface */
export interface IGroup extends IGroupBase {
	code: string;
	owner: string;
	userCount: number;
	users?: IGroupUser[];
}

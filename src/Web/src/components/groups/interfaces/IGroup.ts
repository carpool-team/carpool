import { IGroupUser } from "./IGroupUser";

/** Group interface */
export interface IGroup {
	name: string;
	users: IGroupUser[];
}
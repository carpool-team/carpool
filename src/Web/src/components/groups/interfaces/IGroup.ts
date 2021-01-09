import { IGroupBase } from "./IGroupBase";
import { IParticipant } from "./IParticipant";

/** Group interface */
export interface IGroup extends IGroupBase {
	code: string;
	owner: string;
	userCount: number;
	users?: IParticipant[];
}

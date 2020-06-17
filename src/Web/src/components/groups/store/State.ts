import { IGroup } from "../interfaces/IGroup";
import { IInvite } from "../interfaces/IInvite";
import { IRide } from "../interfaces/IRide";

/** Groups state interface */
export interface IGroupsState {
	/** List of groups */
	groups: IGroup[];
	/** List of invites */
	invites: IInvite[];
	/** List of rides */
	rides: IRide[];
}

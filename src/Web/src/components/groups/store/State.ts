import { IGroup } from "../interfaces/IGroup";
import { IInvite } from "../interfaces/IInvite";
import { IReport } from "../interfaces/IReport";
import { IRide } from "../interfaces/IRide";

/** Groups state interface */
export interface IGroupsState {
	/** List of groups */
	groups: IGroup[];
	/** List of invites */
	invites: IInvite[];
	/** List of rides owned by user */
	ridesOwned: IRide[];
	/** List of rides participated by user */
	ridesParticipated: IRide[];
	/** List of past rides owned by user */
	ridesOwnedPast: IRide[];
	/** List of past rides participated by user */
	ridesParticipatedPast: IRide[];
	/** List of past rides available for user */
	ridesAvailable: IRide[];
	/** Report */
	report: IReport;
}

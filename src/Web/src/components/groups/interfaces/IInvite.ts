import { IGroup } from "./IGroup";
/** Group interface */
export interface IInvite {
	id: string;
	isPending: boolean;
	group: IGroup;
	invitedUserId: string;
	isAccepted: boolean;
	dateAdded: string;
}

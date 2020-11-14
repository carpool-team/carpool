import { IGroup } from "./IGroup";
/** Group interface */
export interface IInvite {
	id: string;
	isPending: boolean;
	groupId: string;
	invitedUserId: string;
	invitingUserId: string;
	isAccepted: boolean;
	dateAdded: string;
}

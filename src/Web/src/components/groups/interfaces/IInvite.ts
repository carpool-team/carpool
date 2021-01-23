import { IInviteUser } from "../components/invite/interfaces/IInviteUser";
import { IGroup } from "./IGroup";
import { ILocation } from "./ILocation";
/** Group interface */
export interface IInvite {
	groupInviteId: string;
	invitedUser: IInviteUser;
	invitingUser: IInviteUser;
	isAccepted: boolean;
	isPending: boolean;
	groupDto: {
		groupId: string;
		location: ILocation;
		name: string;
		userCount: number;
	};
	dateAdded: Date;
}

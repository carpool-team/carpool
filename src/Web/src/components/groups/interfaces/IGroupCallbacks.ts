import { IGroup } from "./IGroup";
import { IInvite } from "./IInvite";
import { IRide } from "./IRide";

/** Callbacks interface for groups */
export interface IGroupCallbacks {
	addGroup: (group: IGroup) => void;
	getGroups: () => IGroup[];
	getInvites: () => IInvite[];
	answerInvite: (accepted: boolean, inviteId: string) => void;
	redirect: (route: string) => void;
	getRides: (owned: boolean) => IRide[];
	participateInRide: (rideId: string) => void;
	setGroupSelected: (id: string) => void;
}

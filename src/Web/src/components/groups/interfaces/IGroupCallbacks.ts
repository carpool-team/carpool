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
	getRides: () => IRide[];
	participateInRide: (rideId: string) => void;
	setGroupSelected: (id: string, selected) => void;
}

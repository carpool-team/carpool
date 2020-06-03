import { IGroup } from "./IGroup";
import { IInvite } from "./IInvite";

/** Callbacks interface for groups */
export interface IGroupCallbacks {
	addGroup: (group: IGroup) => void;
	getGroups: () => IGroup[];
	getInvites: () => IInvite[];
	answerInvite: (accepted: boolean, inviteId: string) => void;
	redirect: (route: string) => void;
}

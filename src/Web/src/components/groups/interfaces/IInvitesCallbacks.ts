import { IInvite } from "./IInvite";

/** Callbacks interface for groups */
export interface IGroupCallbacks {
	acceptInvite: (invite: IInvite) => void;
	getInvite: () => IInvite[];
	declineInvite: (invite: IInvite) => void;
	redirect: (route: string) => void;
}

import { IAddRideInput } from "../../rides/components/addRide/interfaces/IAddRideInput";
import { IAddGroupAction, IAddInvitesAction, IAddRideAction, IAnswerInviteAction, IParticipateInRideAction } from "../store/Types";
import { IAddGroupData } from "./IAddGroupData";
import { IGroup } from "./IGroup";
import { IInvite } from "./IInvite";
import { IRide } from "./IRide";

/** Callbacks interface for groups */
export interface IGroupCallbacks {
	addGroup: (group: IAddGroupData) => IAddGroupAction;
	addRide: (input: IAddRideInput) => IAddRideAction;
	addInvites: (groupId: string, userIds: string[]) => IAddInvitesAction;
	getGroups: () => IGroup[];
	getInvites: () => IInvite[];
	answerInvite: (accepted: boolean, inviteId: string) => IAnswerInviteAction;
	redirect: (route: string) => void;
	getRides: (owned: boolean) => IRide[];
	participateInRide: (rideId: string) => IParticipateInRideAction;
	setGroupSelected: (id: string) => void;
}

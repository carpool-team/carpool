import { IAddRideInput } from "../../rides/components/addRide/interfaces/IAddRideInput";
import { IFormData } from "../components/addGroupForm/interfaces/IFormData";
import { IFormGroupData } from "../components/addGroupForm/interfaces/IFormGroupData";
import { IAddGroupAction, IAddInvitesAction, IAddRideAction, IAnswerInviteAction, IParticipateInRideAction } from "../store/Types";
import { IAddGroupData } from "./IAddGroupData";
import { IGroup } from "./IGroup";
import { IInvite } from "./IInvite";
import { ILocation } from "./ILocation";
import { IRide } from "./IRide";
import { IRideFilters } from "./IRideFilters";

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
	getRidesAvailable: () => IRide[];
	participateInRide: (ride: IRide, location: ILocation, filters?: IRideFilters) => IParticipateInRideAction;
	setGroupSelected: (id: string) => void;
}

import { IGroup } from "./IGroup";
import { IParticipant } from "./IParticipant";
import { ILocation } from "./ILocation";

/** Group interface */
export interface IRide {
	id: string;
	owner: IParticipant;
	participants: IParticipant[];
	stops: ILocation[];
	destination: ILocation;
	startingLocation: ILocation;
	date: string;
	isUserParticipant: boolean;
	group: IGroup;
}

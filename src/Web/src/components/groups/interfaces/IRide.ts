import { IGroup } from "./IGroup";
import { IParticipant } from "./IParticipant";
import { ILocation } from "./ILocation";

/** Group interface */
export interface IRide {
	id: string;
	owner: IParticipant;
	ownerId: string;
	participants?: string[];
	stops?: ILocation[];
	destination: {
		longitude: number,
		latitude: number
	};
	startingLocation: {
		longitude: number,
		latitude: number
	};
	date: string;
	isUserParticipant: boolean;
	group: IGroup;
	groupId: number;
}

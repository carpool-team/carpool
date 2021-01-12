import { ILocation } from "./ILocation";
import { IParticipant } from "./IParticipant";

export interface IRideStop {
	location: ILocation;
	name?: string;
	participant: IParticipant;
}

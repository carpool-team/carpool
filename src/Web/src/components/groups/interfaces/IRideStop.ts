import { ILocation } from "./ILocation";

export interface IRideStop {
	location: ILocation;
	name?: string;
	participant: {
		firstName: string,
		lastName: string,
		participantId: string,
	};
}

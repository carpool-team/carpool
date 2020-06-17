import { IGroupUser } from "./IGroupUser";

interface ILocation {
	coordinates: {
		longitude: number;
		latitude: number;
		coordinatesId: string;
	};
	locationName: string;
	id: string;
}
interface IParticipant {
	userId: string;
	firstName: string;
	lastName: string;
	vehicle: string;
}

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
}

import { ILocation } from "./ILocation";

export interface IGroupBase {
	id: string;
	// location: ILocation[];
	location: {
		longitude: number,
		latitude: number
	};
	rideCount: number;
	name: string;
}

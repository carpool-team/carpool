import { ILocation } from "./ILocation";

export interface IGroupBase {
	id: number;
	// location: ILocation[];
	location: {
		longitude: number,
		latitude: number
	};
	rideCount: number;
	name: string;
}

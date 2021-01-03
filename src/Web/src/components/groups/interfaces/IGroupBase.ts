import { ILocation } from "./ILocation";

export interface IGroupBase {
	id: string;
	location: ILocation;
	rideCount: number;
	name: string;
}

import { ILocation } from "./ILocation";

export interface IGroupBase {
	groupId: string;
	location: ILocation;
	rideCount: number;
	name: string;
}

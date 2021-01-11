import { ILocation } from "./ILocation";

export interface IAddGroupData {
	groupId: string;
	name: string;
	code: string;
	owner: string;
	location: ILocation;
	rideCount: number;
	userCount: number;
}

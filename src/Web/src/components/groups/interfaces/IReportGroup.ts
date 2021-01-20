import { ILocation } from "./ILocation";

export interface IReportGroup {
	userCount: number;
	groupId: string;
	location: ILocation;
	ownerId: string;
	name: string;
}

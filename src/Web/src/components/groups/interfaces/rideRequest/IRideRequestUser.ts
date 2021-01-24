import { ILocation } from "../ILocation";

export interface IRideRequestUser {
	appUserId: string;
	firstName: string;
	lastName: string;
	location: ILocation;
};

import { IGroup } from "./IGroup";
import { IParticipant } from "./IParticipant";
import { ILocation } from "./ILocation";
import { RideDirection } from "../api/addRide/AddRideRequest";
import { IRideStop } from "./IRideStop";

/** Ride interface */
export interface IRide {
	rideId: string;
	rideDate: Date;
	date?: string;
	rideDirection: RideDirection;
	stops?: IRideStop[];
	price: number;
	owner: IParticipant;
	location: ILocation;
	group: IGroup;
	seatsLimit?: number;
}

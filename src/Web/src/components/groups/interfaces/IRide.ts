import { IGroup } from "./IGroup";
import { IParticipant } from "./IParticipant";
import { ILocation } from "./ILocation";
import { RideDirection } from "../api/addRide/AddRideRequest";

/** Ride interface */
export interface IRide {
	rideId: string;
	rideDate: Date;
	rideDirection: RideDirection;
	stops?: ILocation[];
	price: number;
	owner: IParticipant;
	group: IGroup;
	location: ILocation;
}

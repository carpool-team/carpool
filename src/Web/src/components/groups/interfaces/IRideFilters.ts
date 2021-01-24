import { RideDirection } from "../api/addRide/AddRideRequest";
import { ILocation } from "./ILocation";

export interface IRideFilters {
	date: Date;
	location: ILocation;
	direction?: RideDirection;
}

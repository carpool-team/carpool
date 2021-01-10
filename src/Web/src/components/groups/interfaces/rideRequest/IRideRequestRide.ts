import { RideDirection } from "../../api/addRide/AddRideRequest";
import { ILocation } from "../ILocation";

export interface IRideRequestRide {
	date: Date;
	group: {
		groupId: string,
		location: ILocation,
		name: string;
	};
	id: string;
	location: ILocation;
	rideDirection: RideDirection;
}

import { IRideDays } from "./IRideDays";
import { ILocation } from "../../../../groups/interfaces/ILocation";
import { RideDirection } from "../../../../groups/api/addRide/AddRideRequest";

export interface IAddRideInput {
	recurring: boolean;
	weekDays: IRideDays;
	groupId: string;
	rideDirection: RideDirection;
	date: Date;
	location: ILocation;
	seatsLimit: number;
}

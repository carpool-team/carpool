import { ILocation } from "../../../interfaces/ILocation";
import { IRideDays } from "../AddRideForm";
import { RideDirection } from "../../../api/addRide/AddRideRequest"; 

export interface IAddRideInput extends ILocation {
	recurring: boolean;
	weekDays: IRideDays;
	groupId: string;
	rideDirection: RideDirection;
	date: Date;
}

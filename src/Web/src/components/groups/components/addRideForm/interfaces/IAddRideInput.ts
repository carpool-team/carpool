import { ILocation } from "../../../interfaces/ILocation";
import { IRideDays } from "../AddRideForm";

export interface IAddRideInput extends ILocation {
	recurring: boolean;
	weekDays: IRideDays;
	groupId: string;
	to: boolean;
	date: Date;
}

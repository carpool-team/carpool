import { TFunction } from "i18next";
import { IRide } from "components/groups/interfaces/IRide";
import { ILocation } from "../../../groups/interfaces/ILocation";

export default interface IRidesItemProps {
	ride: IRide;
	color: string;
	t: TFunction;
	setRide: (ride: IRide) => void;
	joinRideCallback?: (ride: IRide, location: ILocation, date?: Date) => void;
	date?: Date;
	filterKey?: string;
}

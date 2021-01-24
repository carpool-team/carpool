import { TFunction } from "i18next";
import { IRide } from "components/groups/interfaces/IRide";
import { ILocation } from "../../../groups/interfaces/ILocation";
import { IRideFilters } from "../../../groups/interfaces/IRideFilters";

export default interface IRidesItemProps {
	ride: IRide;
	color: string;
	t: TFunction;
	setRide: (ride: IRide) => void;
	joinRideCallback?: (ride: IRide, location: ILocation, filters?: IRideFilters) => void;
	date?: Date;
	filterKey?: string;
}

import { IRide } from "components/groups/interfaces/IRide";
import { ILocation } from "../../../groups/interfaces/ILocation";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { RidesListType } from "./../enums/RidesListType";

export interface IRidesListProps extends IReactI18nProps {
	rides: IRide[];
	rideSelected: IRide;
	setRide: (ride: IRide) => void;
	firstDay?: string;
	lastDay?: string;
	listType: RidesListType;
	joinRideCallback?: (ride: IRide, location: ILocation, date?: Date) => void;
}

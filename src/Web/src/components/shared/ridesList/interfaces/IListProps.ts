import { IRide } from "components/groups/interfaces/IRide";
import { ILocation } from "../../../groups/interfaces/ILocation";
import { IRideRequest } from "../../../groups/interfaces/IRideRequest";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { RidesListType } from "./../enums/RidesListType";

export interface IListProps extends IReactI18nProps {
	requests?: IRideRequest[];
	rides?: IRide[];
	rideSelected?: IRide;
	requestSelected?: IRideRequest;
	setRide?: (ride: IRide) => void;
	setRequest?: (request: IRideRequest) => void;
	listType: RidesListType;
	firstDay?: string;
	lastDay?: string;
	answerRequestCallback?: (requestId: string, accepted: boolean) => void;
	joinRideCallback?: (ride: IRide, location: ILocation) => void;
}

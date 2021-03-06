import { TFunction } from "i18next";
import { IRideRequest } from "components/groups/interfaces/rideRequest/IRideRequest";

export default interface IRidesItemProps {
	request: IRideRequest;
	color: string;
	t: TFunction;
	setRequest: (request: IRideRequest) => void;
}

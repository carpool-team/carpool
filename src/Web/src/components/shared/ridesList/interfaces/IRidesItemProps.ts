import { TFunction } from "i18next";
import { IRide } from "components/groups/interfaces/IRide";

export default interface IRidesItemProps {
	ride: IRide;
	color: string;
	t: TFunction;
	setRide: (ride: IRide) => void;
}

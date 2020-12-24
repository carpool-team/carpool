import { IRideRequest } from "../../../groups/interfaces/IRideRequest";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { RidesListType } from "./../enums/RidesListType";

export interface IRequestsListProps extends IReactI18nProps {
	requests: IRideRequest[];
	requestSelected: IRideRequest;
	setRequest: (request: IRideRequest) => void;
	listType: RidesListType
}

import { IRideRequest } from "../../../groups/interfaces/rideRequest/IRideRequest";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { LoadingStatus } from "../../enum/LoadingStatus";
import { RidesListType } from "./../enums/RidesListType";

export interface IRequestsListProps extends IReactI18nProps {
	requests: IRideRequest[];
	requestSelected: IRideRequest;
	setRequest: (request: IRideRequest) => void;
	listType: RidesListType;
	answerCallback?: (requestId: string, accepted: boolean) => void;
	loadingStatus: LoadingStatus;
}

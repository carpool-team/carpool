import React from "react";
import { LoadingStatus } from "../../../shared/enum/LoadingStatus";
import { IGroup } from "../../interfaces/IGroup";
import { ILocation } from "../../interfaces/ILocation";
import { IRide } from "../../interfaces/IRide";
import { IRideFilters } from "../../interfaces/IRideFilters";

export interface IGroupDetailedViewProps {
	group: IGroup;
	rides: IRide[];
	joinRideCallback?: (ride: IRide, location: ILocation, filters?: IRideFilters) => void;
	loadingStatus: LoadingStatus;
}

const GroupDetailedView: React.FunctionComponent<IGroupDetailedViewProps> = props => {
	const containerCssClass = "detailedViewContainer";

	return (
		<div className={containerCssClass}>
			{props.children}
		</div>
	);
};

export default GroupDetailedView;

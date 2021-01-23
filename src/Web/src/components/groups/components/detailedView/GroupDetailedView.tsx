import React from "react";
import { IGroup } from "../../interfaces/IGroup";
import { ILocation } from "../../interfaces/ILocation";
import { IRide } from "../../interfaces/IRide";

export interface IGroupDetailedViewProps {
	group: IGroup;
	rides: IRide[];
	joinRideCallback?: (ride: IRide, location: ILocation, date?: Date) => void;
}

const GroupDetailedView: React.FunctionComponent<IGroupDetailedViewProps> = props => {
	const detailedViewContainer = "detailedViewContainer";
	return (
		<div className={detailedViewContainer}>
			{props.children}
		</div>
	);
};

export default GroupDetailedView;

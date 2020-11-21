import React from "react";
import { IGroup } from "../../interfaces/IGroup";

export interface IGroupDetailedViewProps {
	group: IGroup;
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

import React from "react";
import { IGroup } from "../../interfaces/IGroup";
import GroupDetailedView, { IGroupDetailedViewProps } from "../detailedView/GroupDetailedView";

interface IGroupRidesProps extends IGroupDetailedViewProps {
}

const GroupRides = (props: IGroupRidesProps) => {
	return (
		<GroupDetailedView group={props.group}>
			GROUP RIDES: {props.group.id}
		</GroupDetailedView>
	);
};

export default GroupRides;

import React from "react";
import GroupDetailedView, { IGroupDetailedViewProps } from "../detailedView/GroupDetailedView";

interface IGroupEditProps extends IGroupDetailedViewProps {
}

const GroupEdit = (props: IGroupEditProps) => {
	return (
		<GroupDetailedView
			group={props.group}
			rides={props.rides}
		>
			GroupEdit: {props.group.id}
		</GroupDetailedView>
	);
};

export default GroupEdit;

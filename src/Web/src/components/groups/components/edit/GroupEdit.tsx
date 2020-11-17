import React from "react";
import { IGroup } from "../../interfaces/IGroup";
import GroupDetailedView, { IGroupDetailedViewProps } from "../detailedView/GroupDetailedView";

interface IGroupEditProps extends IGroupDetailedViewProps {
}

const GroupEdit = (props: IGroupEditProps) => {
	return (
		<GroupDetailedView group={props.group}>
			GroupEdit: {props.group.id}
		</GroupDetailedView>
	);
};

export default GroupEdit;

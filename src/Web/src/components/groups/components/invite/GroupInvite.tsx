import React from "react";
import GroupDetailedView, { IGroupDetailedViewProps } from "../detailedView/GroupDetailedView";

interface IGroupInviteProps extends IGroupDetailedViewProps {
}

const GroupInvite = (props: IGroupInviteProps) => {
	return (
		<GroupDetailedView
			group={props.group}
			rides={props.rides}
		>
			GROUP INVITE: {props.group.id}
		</GroupDetailedView>
	);
};

export default GroupInvite;

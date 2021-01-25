import React from "react";
import GroupDetailedView, {
	IGroupDetailedViewProps,
} from "../detailedView/GroupDetailedView";
import EditGroupForm from "./components/EditGroupForm";

interface IGroupEditProps extends IGroupDetailedViewProps { }

const GroupEdit = (props: IGroupEditProps) => {
	return (
		<GroupDetailedView
			group={props.group}
			rides={props.rides}
			loadingStatus={props.loadingStatus}
		>
			<EditGroupForm
				group={props.group}
			/>
		</GroupDetailedView>
	);
};

export default GroupEdit;

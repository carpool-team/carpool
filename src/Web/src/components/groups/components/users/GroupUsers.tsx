import React from "react";
import GroupDetailedView, {
	IGroupDetailedViewProps,
} from "../detailedView/GroupDetailedView";
import UsersGroupForm from "./components/UsersGroupForm";

interface IGroupUsersProps extends IGroupDetailedViewProps { }

const GroupUsers = (props: IGroupUsersProps) => {
	return (
		<GroupDetailedView group={props.group} rides={props.rides} loadingStatus={props.loadingStatus}>
			<UsersGroupForm
				group={props.group}
				loadingStatus={props.loadingStatus}
			/>
		</GroupDetailedView>
	);
};

export default GroupUsers;

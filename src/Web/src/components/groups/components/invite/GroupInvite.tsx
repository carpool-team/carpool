import React, { useState } from "react";
import GroupDetailedView, {
	IGroupDetailedViewProps,
} from "../detailedView/GroupDetailedView";
import AddInviteForm from "./components/AddInviteForm";
import { IInviteUser } from "./interfaces/IInviteUser";

interface IGroupInviteProps extends IGroupDetailedViewProps {
	addInvitesCallback: (groupId: string, userIds: string[]) => void;
	currentAppUserId: string;
}

const GroupInvite = (props: IGroupInviteProps) => {
	const [users, setUsers] = useState<IInviteUser[]>([]);

	const addUserCallback: (user: IInviteUser) => void = (user) => {
		setUsers([...users, user]);
	};

	const removeUserCallback: (user: IInviteUser) => void = (user) => {
		setUsers(users.filter((u) => u.email !== user.email));
	};

	return (
		<GroupDetailedView
			group={props.group}
			rides={props.rides}
			loadingStatus={props.loadingStatus}
		>
			<AddInviteForm
				users={users}
				addUserToInvite={addUserCallback}
				removeUser={removeUserCallback}
				onConfirm={() => props.addInvitesCallback(props.group.groupId, users.map(u => u.appUserId))}
				currentAppUserId={props.currentAppUserId}
				groupUserIds={props.group.users?.map(u => u.appUserId)}
			/>
		</GroupDetailedView>
	);
};

export default GroupInvite;

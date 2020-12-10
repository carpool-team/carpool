import React from "react";
import { useImmer } from "use-immer";
import GroupDetailedView, { IGroupDetailedViewProps } from "../detailedView/GroupDetailedView";
import AddInviteForm from "./components/AddInviteForm";
import { IInviteUser } from "./interfaces/IInviteUser";

interface IGroupInviteProps extends IGroupDetailedViewProps {
}

const GroupInvite = (props: IGroupInviteProps) => {
	const [users, setUsers] = useImmer<IInviteUser[]>([]);

	const addUserCallback: (user: IInviteUser) => void = user => {
		setUsers(draft => {
			draft.push({
				email: user.email,
			})
		});
	}

	return (
		<GroupDetailedView
			group={props.group}
			rides={props.rides}
		>
			<AddInviteForm
				users={users}
				addUserToInvite={addUserCallback}
			/>
		</GroupDetailedView>
	);
};

export default GroupInvite;

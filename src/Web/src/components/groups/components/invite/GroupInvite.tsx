import React from "react";

interface IGroupInviteProps {
	selectedGroupId: string;
}

const GroupInvite = (props: IGroupInviteProps) => {
	return (
		<div>
			GROUP INVITE: {props.selectedGroupId}
		</div>
	);
};

export default GroupInvite;

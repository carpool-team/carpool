import React from "react";

interface IGroupEditProps {
	selectedGroupId: string;
}

const GroupEdit = (props: IGroupEditProps) => {
	return (
		<div>
			GroupEdit: {props.selectedGroupId}
		</div>
	);
};

export default GroupEdit;

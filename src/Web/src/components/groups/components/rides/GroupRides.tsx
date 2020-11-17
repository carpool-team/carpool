import React from "react";

interface IGroupRidesProps {
	selectedGroupId: string;
}

const GroupRides = (props: IGroupRidesProps) => {
	return (
		<div>
			GROUP RIDES: {props.selectedGroupId}
		</div>
	);
};

export default GroupRides;

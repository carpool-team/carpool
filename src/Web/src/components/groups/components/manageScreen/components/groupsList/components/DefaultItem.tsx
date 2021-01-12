import React from "react";
import { IListItemProps } from "../interfaces/IListItemProps";

const DefaultItem: React.FC<IListItemProps> = props => {
	const color = {
		color: props.color,
	};

	const cssClasses = {
		label: "groupsManagementList--label",
		button: "groupsManagementList--button",
		pin: "groupsManagementList--pin",
	};

	return (
		<li key={props.group.groupId}>
			<button
				onClick={() => props.setGroupSelected()}
				className={cssClasses.button}
			>
				<div className={cssClasses.pin} style={color}>
					{" "}
				</div>
				<div className={cssClasses.label}>{props.group.name}</div>
			</button>
		</li>
	);
};

export default DefaultItem;

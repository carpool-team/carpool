import React from "react";
import { IGroup } from "../../../interfaces/IGroup";

interface IGroupsListProps {
	getGroupsCallback: () => IGroup[];
	setGroupChecked: (id: string, checked: boolean) => void;
}

const GroupsList = (props: IGroupsListProps) => {
	const listCssClass: string = "groupsManagementList";
	const labelCssClass: string = "groupsManagementList--label";
	const buttonCssClass: string = "groupsManagementList--button";
	const pinCssClass: string = "groupsManagementList--pin";

	const groups: IGroup[] = props.getGroupsCallback();

	let colorList: string[] = ["#C39BD3", "#7FB3D5", "#48C9B0", "#F9E79F"];
	let colorIndex: number = 0;

	return (
		<ul className={listCssClass}>
			{groups.map((group) => {
				++colorIndex;
				const color = {
					color: colorList[colorIndex % colorList.length]
				};
				return (
					<li key={group.name}>
						<button className={buttonCssClass}>
							<div className={pinCssClass} style={color}>	</div>
							<div className={labelCssClass}>
								{group.name}
							</div>
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default GroupsList;

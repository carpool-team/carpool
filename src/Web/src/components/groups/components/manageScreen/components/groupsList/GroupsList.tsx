import React, { useState } from "react";
import { IGroup } from "../../../../interfaces/IGroup";
import { colorList } from "../../../../../../scss/colorList";
import DefaultItem from "./components/DefaultItem";
import ActiveItem from "./components/ActiveItem";

interface IGroupsListProps {
	getGroupsCallback: () => IGroup[];
	setGroupSelected: (id: string) => void;
	groupSelected: IGroup;
}

const GroupsList = (props: IGroupsListProps) => {
	const listCssClass: string = "groupsManagementList";

	const groups: IGroup[] = props.getGroupsCallback();

	let colorIndex: number = 0;

	return (
		<ul className={listCssClass}>
			{groups.map((group) => {
				++colorIndex;
				const color = colorList[colorIndex % colorList.length];
				return (
					<React.Fragment key={group.groupId}>
						{(() => {
							if (
								props.groupSelected &&
								props.groupSelected.groupId === group.groupId
							) {
								return (
									<ActiveItem
										group={group}
										color={color}
										setGroupSelected={() => props.setGroupSelected(null)}
									/>
								);
							} else {
								return (
									<DefaultItem
										group={group}
										color={color}
										setGroupSelected={() =>
											props.setGroupSelected(group.groupId)
										}
									/>
								);
							}
						})()}
					</React.Fragment>
				);
			})}
		</ul>
	);
};

export default GroupsList;

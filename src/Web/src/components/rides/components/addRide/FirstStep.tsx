import React from "react";
import { colorList } from "../../../../scss/colorList";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import "./AddRide.scss";
import { IGroup } from "../../../groups/interfaces/IGroup";

interface IGroupsListProps extends IReactI18nProps {
	groups: IGroup[];
	setGroupSelected: (group: IGroup) => void;
}
interface IListItemProps {
	group: IGroup;
	color: string;
	setGroup: () => void;
}

const FirstStep = (props: IGroupsListProps) => {
	const listCssClass: string = "groupsList";
	const labelCssClass: string = "groupsItem__default--label";
	const buttonCssClass: string = "groupsItem__default--button";
	const pinCssClass: string = "groupsItem__default--pin";
	const listwraper: string = "groupsManagementList__wraper";

	const groups: IGroup[] = props.groups;

	let colorIndex: number = 0;

	const DefaultItem = (props: IListItemProps) => {
		const color = {
			color: props.color
		};
		return (
			<React.Fragment key={props.group.groupId}>
				<li key={props.group.groupId}>
					<button
						onClick={() => props.setGroup()}
						className={buttonCssClass}
					>
						<div className={pinCssClass} style={color}>	</div>
						<div className={labelCssClass}>
							{props.group.name}
						</div>
					</button>
				</li>
			</React.Fragment>
		);
	};

	return (
		<div className={listwraper}	>
			<ul className={listCssClass}>
				{groups.map((group, idx) => {
					++colorIndex;
					const color = colorList[colorIndex % colorList.length];
					return (
						<DefaultItem
							key={idx}
							group={group}
							color={color}
							setGroup={() => props.setGroupSelected(group)}
						/>);
				})}
			</ul>
		</div>

	);
};

export default withTranslation()(FirstStep);

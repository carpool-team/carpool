import React from "react";
import { IGroup } from "../../../interfaces/IGroup";
import ButtonLink from "../../../../ui/buttonLink/ButtonLink";
import { colorList } from "../../../../../scss/colorList";
import LayoutRouter from "../../../../layout/components/LayoutRouter";
import GroupsRouter from "../../GroupsRouter";

interface IGroupsListProps {
	getGroupsCallback: () => IGroup[];
	setGroupSelected: (id: string, unselect: boolean) => void;
	groupSelected: IGroup;
}
interface IListItemProps {
	group: IGroup;
	color: string;
	setGroupSelected: () => void;
}

const GroupsList = (props: IGroupsListProps) => {
	const listCssClass: string = "groupsManagementList";
	const labelCssClass: string = "groupsManagementList--label";
	const buttonCssClass: string = "groupsManagementList--button";
	const pinCssClass: string = "groupsManagementList--pin";
	const menuCssClass: string = "groupsManagementList--menu";

	const activeListItemCssClass: string = "groupsManagementList__active";
	const activeButtonCssClass: string = "groupsManagementList__active--button";
	const activeLabelCssClass: string = "groupsManagementList__active--label";
	const activeMenuCssClass: string = "groupsManagementList__active--menu";

	const groups: IGroup[] = props.getGroupsCallback();

	let colorIndex: number = 0;

	const ActiveItem = (props: IListItemProps) => {
		const color = {
			color: props.color
		};
		return (
			<li className={activeListItemCssClass} key={props.group.id}>
				<button
					onClick={() => props.setGroupSelected()}
					className={activeButtonCssClass}
					style={color}
				>
					<div className={pinCssClass} style={color}>	</div>
					<div className={activeLabelCssClass}>
						{props.group.name}
					</div>
				</button>
				<div className={activeMenuCssClass}>
					<ButtonLink to={`/${LayoutRouter.routes.groups}${GroupsRouter.routes.rides}`}>
						Przejazdy
				</ButtonLink>
					{/* TODO Sprawdzać czy użytkownik ma prawa jest ownerem grupy, inaczej nie wyświetlać tego. */}
					<ButtonLink to={`/${LayoutRouter.routes.groups}${GroupsRouter.routes.edit}`}>
						Edytuj grupę
				</ButtonLink>
					<ButtonLink to={`/${LayoutRouter.routes.groups}${GroupsRouter.routes.invite}`}>
						Zaproś do grupy
				</ButtonLink>
				</div>
			</li>
		);
	};

	const DefaultItem = (props: IListItemProps) => {
		const color = {
			color: props.color
		};
		return (
			<li key={props.group.id}>
				<button
					onClick={() => props.setGroupSelected()}
					className={buttonCssClass}
				>
					<div className={pinCssClass} style={color}>	</div>
					<div className={labelCssClass}>
						{props.group.name}
					</div>
				</button>
			</li>
		);
	};

	return (
		<ul className={listCssClass}>
			{groups.map((group) => {
				++colorIndex;
				const color = colorList[colorIndex % colorList.length];
				return (
					<React.Fragment key={group.id}>
						{(() => {
							if (props.groupSelected && props.groupSelected.id === group.id) {
								return (
									<ActiveItem
										group={group}
										color={color}
										setGroupSelected={() => props.setGroupSelected(null, true)}
									/>);
							} else {
								return (
									<DefaultItem
										group={group}
										color={color}
										setGroupSelected={() => props.setGroupSelected(group.id, true)}
									/>);
							}
						})()}
					</React.Fragment>
				);
			})}
		</ul>
	);
};

export default GroupsList;

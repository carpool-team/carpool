import React from "react";
import { colorList } from "../../../scss/colorList";
import { mainRoutes } from "../../layout/components/LayoutRouter";
import { TFunction } from "i18next";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import "./AddRide.scss"
import { IGroup } from "components/groups/interfaces/IGroup";

interface IGroupsListProps extends IReactI18nProps {
	groups: IGroup[];
	setGroupSelected: (group: IGroup) => void;
}
interface IListItemProps {
	group: IGroup;
	color: string;
	setGroup: () => void;
	t: TFunction;
}

const FirstStep = (props: IGroupsListProps) => {
	const listCssClass: string = "groupsList";
	const labelCssClass: string = "groupsItem__default--label";
	const buttonCssClass: string = "groupsItem__default--button";
	const pinCssClass: string = "groupsItem__default--pin";

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
		<ul className={listCssClass}>
			{groups.map((group) => {
				++colorIndex;
				const color = colorList[colorIndex % colorList.length];
				const { t } = props;
				return (
					<DefaultItem
						group={group}
						color={color}
						setGroup={() => props.setGroupSelected(group)}
						t={t}
					/>);
			})}
		</ul>
	);
};

export default withTranslation()(FirstStep);

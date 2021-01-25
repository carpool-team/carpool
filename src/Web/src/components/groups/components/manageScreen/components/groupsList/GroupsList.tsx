import React, { useState } from "react";
import { IGroup } from "../../../../interfaces/IGroup";
import { colorList } from "../../../../../../scss/colorList";
import DefaultItem from "./components/DefaultItem";
import ActiveItem from "./components/ActiveItem";
import { LoadingStatus } from "../../../../../shared/enum/LoadingStatus";
import LoaderBlock from "../../../../../ui/loaderBlock/LoaderBlock";
import LabelBlock from "../../../../../ui/labelBlock/LabelBlock";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../../../system/resources/IReactI18nProps";

interface IGroupsListProps extends IReactI18nProps {
	getGroupsCallback: () => IGroup[];
	setGroupSelected: (id: string) => void;
	groupSelected: IGroup;
	loadingStatus: LoadingStatus;
}

const GroupsList = (props: IGroupsListProps) => {
	const listCssClass: string = "groupsManagementList";

	const groups: IGroup[] = props.getGroupsCallback();

	const resources = {
		noGroups: "groupsList.noGroupsLabel",
		getError: "groupsList.getErrorLabel",
	};

	let colorIndex: number = 0;

	const renderItems = () => {
		switch (props.loadingStatus) {
			case LoadingStatus.Loading:
				return <LoaderBlock />;
			case LoadingStatus.Error:
				return <LabelBlock text={props.t(resources.getError)} />;
			default:
			case LoadingStatus.Success:
				if (groups.length > 0) {
					return (
						groups.map((group) => {
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
													setGroupSelected={() => props.setGroupSelected(group.groupId)}
												/>
											);
										}
									})()}
								</React.Fragment>
							);
						})
					);
				} else {
					return <LabelBlock text={props.t(resources.noGroups)} />;
				}
		}
	};

	return (
		<ul className={listCssClass}>
			{renderItems()}
		</ul>
	);
};

export default withTranslation()(GroupsList);

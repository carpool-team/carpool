import React from "react";
import ButtonCheckBox from "../../../../ui/Button/ButtonCheckBox";
import { ButtonSize } from "../../../../ui/Button/enums/ButtonSize";
import { ButtonType } from "../../../../ui/Button/enums/ButtonType";
import { ButtonShape } from "../../../../ui/Button/enums/ButtonShape";
import { IGroup } from "../../../interfaces/IGroup";

interface IGroupsListProps {
	getGroupsCallback: () => IGroup[];
}

const GroupsList = (props: IGroupsListProps) => {
	const listCssClass: string = "groupList__list";

	return (
		<ul className={listCssClass}>
			{props.getGroupsCallback().map((group) => {
				return (
					<li key={group.name}>
						<ButtonCheckBox
							size={ButtonSize.Standard}
							type={ButtonType.Standard}
							shape={ButtonShape.Circle}
							label={group.name}
						></ButtonCheckBox>
					</li>
				);
			})}
		</ul>
	);
};

export default GroupsList;

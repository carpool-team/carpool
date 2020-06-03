import React from "react";
import ButtonCheckBox from "../../../../ui/Button/ButtonCheckBox";
import ButtonAcceptDecline from "../../../../ui/Button/ButtonAcceptDecline";
import { ButtonSize } from "../../../../ui/Button/enums/ButtonSize";
import { ButtonType } from "../../../../ui/Button/enums/ButtonType";
import { ButtonShape } from "../../../../ui/Button/enums/ButtonShape";
import { IGroup } from "../../../interfaces/IGroup";

interface IInvitesListProps {
	getInvitesCallback: () => IGroup[];
}

const InvitesList = (props: IInvitesListProps) => {
	const listCssClass: string = "groupList__list";

	return (
		<ul className={listCssClass}>
			{props.getInvitesCallback().map((group) => {
				return (
					<li key={group.name}>
						<ButtonAcceptDecline
							size={ButtonSize.Standard}
							type={ButtonType.Standard}
							shape={ButtonShape.Circle}
							label={group.name}
						></ButtonAcceptDecline>
					</li>
				);
			})}
		</ul>
	);
};

export default InvitesList;

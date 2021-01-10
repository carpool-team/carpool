import React from "react";
import { getId } from "../../../../../../../helpers/UniversalHelper";
import ButtonSmall from "../../../../../../ui/buttonSmall/ButtonSmall";
import { ButtonSmallBackground } from "../../../../../../ui/buttonSmall/enums/ButtonSmallBackground";
import { ButtonSmallColor } from "../../../../../../ui/buttonSmall/enums/ButtonSmallColor";
import { ButtonSmallIcon } from "../../../../../../ui/buttonSmall/enums/ButtonSmallIcon";
import { IGroupUser } from "../../../../../interfaces/IGroupUser";

interface Props {
	color: {
		color: string;
	};
	user: IGroupUser;
	onClickItem: (user: IGroupUser) => void;
}

const ListItem = (props: Props) => {
	const cssClasses = {
		userListItem: "addGroupSecondSide__userListItem",
		userListItemName: "addGroupSecondSide__userListItemName",
		userListButton: "addGroupSecondSide__userListItem--button",
	};

	const renderDeleteButton = () => {
		// If user can access this - it's admin, so can't be deleted from group
		const isOwnerItem: boolean = props.user?.appUserId === getId();
		if (isOwnerItem) {
			return null;
		} else {
			return (
				<ButtonSmall
					style={cssClasses.userListButton}
					icon={ButtonSmallIcon.Close}
					onClick={() => props.onClickItem(props.user)}
					color={ButtonSmallColor.Red}
					background={ButtonSmallBackground.White}
				/>
			);
		}
	};

	return (
		<li>
			<div className={cssClasses.userListItem} style={props.color}>
				<div className={cssClasses.userListItemName}>
					{`${props.user.firstName} ${props.user.lastName} `}
				</div>
				{renderDeleteButton()}
			</div>
		</li>
	);
};

export default ListItem;

import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { getState } from "../../../../../../../store/Index";
import { IReactI18nProps } from "../../../../../../system/resources/IReactI18nProps";
import { IListItemProps } from "../interfaces/IListItemProps";
import ButtonLink from "../../../../../../ui/buttonLink/ButtonLink";
import LeaveGroupModal from "./LeaveGroupModal";
import { mainRoutes } from "../../../../../../layout/components/LayoutRouter";
import GroupsRouter from "../../../../GroupsRouter";
import { connect } from "react-redux";
import { leaveGroup } from "../../../../../store/Actions";
import { ILeaveGroupAction } from "../../../../../store/Types";

interface IDispatchPropsType {
	leaveGroup: (groupId: string) => ILeaveGroupAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	leaveGroup,
};

export type DispatchProps = typeof mapDispatchToProps;

interface IActiveItemProps extends IListItemProps, IReactI18nProps, DispatchProps {
}

const ActiveItem: React.FC<IActiveItemProps> = props => {
	const [popover, setPopover] = useState<boolean>(false);
	const [isOwner, setIsOwner] = useState(false);
	const { t } = props;
	const color = {
		color: props.color,
	};

	useEffect(() => {
		console.log("GROUP OWNER ID: ", props.group.owner?.appUserId);
		console.log("MY ID: ", getState().auth?.tokenInfo?.payload?.sub);
		const owned: boolean = props.group.owner?.appUserId === getState().auth?.tokenInfo?.payload?.sub;
		setIsOwner(owned);
		console.log("OWNED: ", owned);
	}, [props.group]);

	const cssClasses = {
		menu: "groupsManagementList__active--menu",
		label: "groupsManagementList__active--label",
		button: "groupsManagementList__active--button",
		item: "groupsManagementList__active",
		pin: "groupsManagementList--pin",
	};

	const resources = {
		editGroup: "groups.list.editGroup",
		ridesInGroup: "groups.list.ridesInGroup",
		inviteToGroup: "groups.list.inviteToGroup",
		leaveGroup: "groups.list.leaveGroup",
		report: "groups.list.report"
	};

	const handleOpenPopover = () => {
		setPopover(true);
	};

	const handleClosePopover = () => {
		setPopover(false);
	};

	const onLeaveConfirm = () => {
		props.leaveGroup(props.group.groupId);
		handleClosePopover();
	};

	const renderManagePart = () => {
		const { t } = props;
		if (isOwner) {
			return <>
				<ButtonLink to={`/${mainRoutes.groups}${GroupsRouter.routes.edit}`}>
					{t(resources.editGroup)}
				</ButtonLink>
				<ButtonLink to={`/${mainRoutes.groups}${GroupsRouter.routes.invite}`}>
					{t(resources.inviteToGroup)}
				</ButtonLink>
			</>;
		} else {
			return null;
		}
	};

	const renderLeaveGroupPart = () => {
		const { t } = props;
		// Owner CAN'T leave group
		if (!isOwner) {
			return <>
				<ButtonLink onClick={handleOpenPopover}>
					{t(resources.leaveGroup)}
				</ButtonLink>
				<LeaveGroupModal
					open={popover}
					onLeaveConfirm={onLeaveConfirm}
					handleClose={handleClosePopover}
				/>
			</>;
		} else {
			return null;
		}
	};

	return (
		<li className={cssClasses.item} key={props.group.groupId}>
			<button
				onClick={() => props.setGroupSelected()}
				className={cssClasses.button}
				style={color}
			>
				<div className={cssClasses.pin} style={color}>
					{" "}
				</div>
				<div className={cssClasses.label}>{props.group.name}</div>
			</button>
			<div className={cssClasses.menu}>
				<ButtonLink to={`/${mainRoutes.groups}${GroupsRouter.routes.rides}`}>
					{t(resources.ridesInGroup)}
				</ButtonLink>
				<ButtonLink to={`/${mainRoutes.groups}${GroupsRouter.routes.report}`}>
					{t(resources.report)}
				</ButtonLink>
				{renderManagePart()}
				{renderLeaveGroupPart()}
			</div>
		</li>
	);
};

export default connect(null, mapDispatchToProps)(
	withTranslation()(ActiveItem)
);

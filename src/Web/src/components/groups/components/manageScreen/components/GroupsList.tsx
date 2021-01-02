import React, { useState } from "react";
import { IGroup } from "../../../interfaces/IGroup";
import ButtonLink from "../../../../ui/buttonLink/ButtonLink";
import { colorList } from "../../../../../scss/colorList";
import { mainRoutes } from "../../../../layout/components/LayoutRouter";
import GroupsRouter from "../../GroupsRouter";
import { TFunction } from "i18next";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import { Popover } from "@material-ui/core";
import Button from "../../../../ui/button/Button";
import { ButtonColor } from "../../../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../../../ui/button/enums/ButtonBackground";

interface IGroupsListProps extends IReactI18nProps {
	getGroupsCallback: () => IGroup[];
	setGroupSelected: (id: string) => void;
	groupSelected: IGroup;
}
interface IListItemProps {
	group: IGroup;
	color: string;
	setGroupSelected: () => void;
	t: TFunction;
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
	const popoverContainer: string = "auth__popover";
	const button: string = "auth__inputs--button";
	const buttonContainer: string = "auth__inputs--buttonContainer";

	const resources = {
		editGroup: "groups.list.editGroup",
		ridesInGroup: "groups.list.ridesInGroup",
		inviteToGroup: "groups.list.inviteToGroup",
		leaveGroup: "groups.list.leaveGroup",
		yes: "yes",
		no: "no",
		leaveConfirm: "groups.list.leaveConfirm"
	};

	const [popover, setPopover] = useState<boolean>(false);

	const handleOpenPopover = () => {
		setPopover(true);
	};

	const handleClosePopover = () => {
		setPopover(false);
	};

	const onDeleteSubmit = () => {
		// TODO wysyłać request o opuszczeniu grupy
		handleClosePopover();
	};


	const groups: IGroup[] = props.getGroupsCallback();

	let colorIndex: number = 0;

	const ActiveItem = (props: IListItemProps) => {
		const color = {
			color: props.color,
		};

		const { t } = props;
		return (
			<li className={activeListItemCssClass} key={props.group.groupId}>
				<button
					onClick={() => props.setGroupSelected()}
					className={activeButtonCssClass}
					style={color}
				>
					<div className={pinCssClass} style={color}>
						{" "}
					</div>
					<div className={activeLabelCssClass}>{props.group.name}</div>
				</button>
				<div className={activeMenuCssClass}>
					<ButtonLink to={`/${mainRoutes.groups}${GroupsRouter.routes.rides}`}>
						{t(resources.ridesInGroup)}
					</ButtonLink>
					{/* TODO Sprawdzać czy użytkownik ma prawa jest ownerem grupy, inaczej nie wyświetlać tego. */}
					<ButtonLink to={`/${mainRoutes.groups}${GroupsRouter.routes.edit}`}>
						{t(resources.editGroup)}
					</ButtonLink>
					<ButtonLink to={`/${mainRoutes.groups}${GroupsRouter.routes.invite}`}>
						{t(resources.inviteToGroup)}
					</ButtonLink>
					{/* TODO Sprawdzać czy użytkownik jest ownerem grupy,jeżeeli tak to NIE wyświetlać tego. */}
					<ButtonLink onClick={handleOpenPopover}>
						{t(resources.leaveGroup)}
					</ButtonLink>

					<Popover
						open={popover}
						onClose={handleClosePopover}
						anchorOrigin={{
							vertical: "center",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "center",
							horizontal: "center",
						}}
					>
						<div className={popoverContainer}>
							<span>{t(resources.leaveConfirm)}</span>
							<div className={buttonContainer}>
								<Button
									additionalCssClass={button}
									onClick={onDeleteSubmit}
									color={ButtonColor.White}
									background={ButtonBackground.Red}
								>
									{t(resources.yes)}
								</Button>
								<Button
									additionalCssClass={button}
									onClick={handleClosePopover}
									color={ButtonColor.White}
									background={ButtonBackground.Blue}
								>
									{t(resources.no)}
								</Button>
							</div>
						</div>
					</Popover>

				</div>
			</li>
		);
	};

	const DefaultItem = (props: IListItemProps) => {
		const color = {
			color: props.color,
		};
		return (
			<li key={props.group.groupId}>
				<button
					onClick={() => props.setGroupSelected()}
					className={buttonCssClass}
				>
					<div className={pinCssClass} style={color}>
						{" "}
					</div>
					<div className={labelCssClass}>{props.group.name}</div>
				</button>
			</li>
		);
	};

	return (
		<ul className={listCssClass}>
			{groups.map((group) => {
				++colorIndex;
				const color = colorList[colorIndex % colorList.length];
				const { t } = props;
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
										t={t}
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
										t={t}
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

export default withTranslation()(GroupsList);

import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Popover } from "@material-ui/core";
import { IGroup } from "../../../../interfaces/IGroup";
import Button from "../../../../../ui/button/Button";
import { mainRoutes } from "../../../../../layout/components/LayoutRouter";
import { ButtonBackground } from "../../../../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../../../../ui/button/enums/ButtonColor";
import { IReactI18nProps } from "../../../../../system/resources/IReactI18nProps";
import { IGroupUser } from "../../../../interfaces/IGroupUser";
import { useHistory } from "react-router";
import ListItem from "./components/ListItem";

interface IUserListProps extends IReactI18nProps {
	group: IGroup;
	onDeleteUser: (user: IGroupUser) => void;
}

const UserList: React.FC<IUserListProps> = props => {
	const [popover, setPopover] = useState<boolean>(false);
	const [deleteUser, setDeleteUser] = useState<IGroupUser>(null);
	const { t } = props;
	const history = useHistory();

	const handleOpenPopover = (user: IGroupUser) => {
		setPopover(true);
		setDeleteUser(user);
	};

	const handleClosePopover = () => {
		setPopover(false);
		setDeleteUser(null);
	};

	const onDeleteSubmit = () => {
		props.onDeleteUser(deleteUser);
		handleClosePopover();
	};

	let colorList: string[] = ["#C39BD3", "#7FB3D5", "#48C9B0", "#F9E79F"];
	let colorIndex: number = 0;

	const cssClasses = {
		userList: "addGroupSecondSide__userList",
		buttonsGroup: "addGroupSecondSide__buttonsGroup",
		leftLabels: "rides--leftPanel__label",
		leftOutline: "rides--leftPanel__outline",
		leftLabelsText: "rides--leftPanel__text",
		leftPanel: "rides--leftPanel",
		left: "addGroupSecondSide__left",
		button: "auth__inputs--button",
		popoverContainer: "auth__popover",
		buttonContainer: "auth__inputs--buttonContainer",
	};

	const resources = {
		back: "prevBtn",
		yes: "yes",
		no: "no",
		leaveConfirm: "groups.editGroupForm.deleteUserConfirm"
	};

	return (
		<div className={cssClasses.left}>
			<div className={cssClasses.leftLabelsText}> {props.group.name}</div>
			<div className={cssClasses.leftLabels}>
				<Button onClick={() => {
					history.push(`/${mainRoutes.groups}`);
				}}
					background={ButtonBackground.Blue}
					color={ButtonColor.White}
				>
					{t(resources.back)}
				</Button>
			</div>
			<div className={cssClasses.leftOutline}></div>
			<ul className={cssClasses.userList}>
				<Popover
					open={popover}
					onClose={handleClosePopover}
					anchorOrigin={{
						vertical: "center",
						horizontal: "center",
					}}
					anchorEl={document.querySelector("main")}
					transformOrigin={{
						vertical: "center",
						horizontal: "center",
					}}
				>
					<div className={cssClasses.popoverContainer}>
						<span>{t(resources.leaveConfirm)} {deleteUser?.firstName} {deleteUser?.lastName}?</span>
						<div className={cssClasses.buttonContainer}>
							<Button
								additionalCssClass={cssClasses.button}
								onClick={onDeleteSubmit}
								color={ButtonColor.White}
								background={ButtonBackground.Red}
							>
								{t(resources.yes)}
							</Button>
							<Button
								additionalCssClass={cssClasses.button}
								onClick={handleClosePopover}
								color={ButtonColor.White}
								background={ButtonBackground.Blue}
							>
								{t(resources.no)}
							</Button>
						</div>
					</div>
				</Popover>
				{(props.group?.users ?? []).map((user: IGroupUser, idx: number) => {
					++colorIndex;
					const color = {
						color: colorList[colorIndex % colorList.length]
					};
					return (
						<ListItem
							key={idx}
							color={color}
							user={user}
							onClickItem={handleOpenPopover}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default withTranslation()(UserList);

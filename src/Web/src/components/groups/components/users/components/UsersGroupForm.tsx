import { Popover } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { useHistory } from "react-router";
import { mainRoutes } from "../../../../layout/components/LayoutRouter";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import Button from "../../../../ui/button/Button";
import { ButtonBackground } from "../../../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../../../ui/button/enums/ButtonColor";
import ButtonSmall from "../../../../ui/buttonSmall/ButtonSmall";
import { ButtonSmallBackground } from "../../../../ui/buttonSmall/enums/ButtonSmallBackground";
import { ButtonSmallColor } from "../../../../ui/buttonSmall/enums/ButtonSmallColor";
import { ButtonSmallIcon } from "../../../../ui/buttonSmall/enums/ButtonSmallIcon";
import { IGroup } from "../../../interfaces/IGroup";
import { IGroupUser } from "../../../interfaces/IGroupUser";
import { IParticipant } from "../../../interfaces/IParticipant";
import { getGroupUsers } from "../../../store/Actions";
import { IGroupsState } from "../../../store/State";
import { IGetGroupUsersAction } from "../../../store/Types";

interface IDispatchPropsType {
	getGroupUsers: (groupId: string) => IGetGroupUsersAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	getGroupUsers,
};

export type DispatchProps = typeof mapDispatchToProps;
interface IUsersGroupProps extends IReactI18nProps, DispatchProps {
	group: IGroup;
}

const UsersGroupForm: (props: IUsersGroupProps) => JSX.Element = props => {
	useEffect(() => {
		props.getGroupUsers(props.group.groupId);
	}, []);

	const history = useHistory();

	// userzy w props.group.users po pobraniu
	useEffect(() => {
		console.log(props.group?.users);
	}, [props.group?.users]);

	const { t } = props;

	const resources = {
		back: "prevBtn",
		yes: "yes",
		no: "no",
		leaveConfirm: "groups.editGroupForm.deleteUserConfirm"
	}

	const cssClasses = {
		container: "addGroupContainerSecond",
		inputs: "addGroupSecondSide__inputs",
		userList: "addGroupSecondSide__userList",
		userListItem: "addGroupSecondSide__userListItem",
		userListItemName: "addGroupSecondSide__userListItemName",
		buttonsGroup: "addGroupSecondSide__buttonsGroup",
		groupName: "addGroupSecondSide__inputs--groupName",
		leftLabels: "rides--leftPanel__label",
		leftOutline: "rides--leftPanel__outline",
		leftLabelsText: "rides--leftPanel__text",
		leftPanel: "rides--leftPanel",
		left: "addGroupSecondSide__left",
		userListButton: "addGroupSecondSide__userListItem--button",
		button: "auth__inputs--button",
		popoverContainer: "auth__popover",
		buttonContainer: "auth__inputs--buttonContainer",
	};

	const [popover, setPopover] = useState<boolean>(false);
	const [deleteUser, setDeleteUser] = useState<IGroupUser>(null)

	const handleOpenPopover = (user: IGroupUser) => {
		setPopover(true);
		setDeleteUser(user)
	};

	const handleClosePopover = () => {
		setPopover(false);
		setDeleteUser(null)
	};

	const onDeleteSubmit = () => {
		//tutaj podpiąć api do usuwania, jeszcze trzeba dodać na liście żeby admin grupy nie mógł się usunąć czyli przy nim nie wyświetlać przycisku X
		console.log(deleteUser);
		handleClosePopover();
	};

	const renderUserList = () => {
		let colorList: string[] = ["#C39BD3", "#7FB3D5", "#48C9B0", "#F9E79F"];
		let colorIndex: number = 0;

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
					{(props.group?.users ?? []).map((user, idx) => {
						++colorIndex;
						const color = {
							color: colorList[colorIndex % colorList.length]
						};
						return (
							<li key={idx}>
								<div className={cssClasses.userListItem} style={color}>
									<div className={cssClasses.userListItemName}>
										{`${user.firstName} ${user.lastName} `}
									</div>
									<ButtonSmall
										style={cssClasses.userListButton}
										icon={ButtonSmallIcon.Close}
										onClick={() => handleOpenPopover(user)}
										color={ButtonSmallColor.Red}
										background={ButtonSmallBackground.White}
									/>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		);
	};

	const renderUserInfo = () => (
		<div className={cssClasses.inputs}>
			<span> Liczba użytkowników w grupie <span className={cssClasses.groupName}>{props.group.name} : {props.group.userCount} </span> </span>
		</div>
	);


	return (
		<div className={cssClasses.container} >
			{renderUserList()}
			<MediaQuery query="(min-width: 900px)">
				{renderUserInfo()}
			</MediaQuery>
		</div>
	);
};

export default connect(null, mapDispatchToProps)(
	withTranslation()(UsersGroupForm)
);

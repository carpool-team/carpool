import React, { useEffect } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { LoadingStatus } from "../../../../shared/enum/LoadingStatus";
import { IGroup } from "../../../interfaces/IGroup";
import { deleteUserFromGroup, getGroupUsers } from "../../../store/Actions";
import { IDeleteUserFromGroupAction, IGetGroupUsersAction } from "../../../store/Types";
import UserList from "./usersList/UserList";

interface IDispatchPropsType {
	getGroupUsers: (groupId: string) => IGetGroupUsersAction;
	deleteUserFromGroup: (groupId: string, userId: string) => IDeleteUserFromGroupAction;
}

const mapDispatchToProps: IDispatchPropsType = {
	getGroupUsers,
	deleteUserFromGroup,
};

type DispatchProps = typeof mapDispatchToProps;
interface IUsersGroupProps extends DispatchProps {
	group: IGroup;
	loadingStatus: LoadingStatus;
}

const UsersGroupForm: (props: IUsersGroupProps) => JSX.Element = props => {
	useEffect(() => {
		props.getGroupUsers(props.group.groupId);
	}, []);

	useEffect(() => {
		console.log(props.group?.users);
	}, [props.group?.users]);

	const cssClasses = {
		container: "addGroupContainerSecond",
		inputs: "addGroupSecondSide__inputs",
		groupName: "addGroupSecondSide__inputs--groupName",
	};

	const renderUserList = () => (
		<UserList
			group={props.group}
			onDeleteUser={(user) => {
				props.deleteUserFromGroup(props.group.groupId, user.appUserId);
			}}
		/>
	);

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

export default connect(null, mapDispatchToProps)(UsersGroupForm);

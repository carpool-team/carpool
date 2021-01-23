import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router";
import { IReactI18nProps } from "../system/resources/IReactI18nProps";
import UserData from "./components/UserData";
import UserPassword from "./components/UserPassword";
import { ProfileList } from "./enums/ProfileList";

interface IUserProfileProps extends IReactI18nProps, RouteComponentProps {
}

const UserProfile: React.FC<IUserProfileProps> = (props) => {

	const cssClasses = {
		container: "auth__container",
		image: "auth__image--login"
	};

	const [currentList, setCurrentList] = useState(ProfileList.Data);

	const renderDataList = () => (
		<UserData setCurrentList={setCurrentList} />
	);

	const renderPasswordList = () => (
		<UserPassword setCurrentList={setCurrentList} />
	);

	const renderList = () => {
		let list: JSX.Element;
		switch (currentList) {
			case ProfileList.Password:
				list = renderPasswordList();
				break;
			case ProfileList.Data:
			default:
				list = renderDataList();
				break;
		}
		return list;
	};

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.image}>
				{renderList()}
			</div>
		</div>
	);
};

export default withTranslation()(withRouter(UserProfile));

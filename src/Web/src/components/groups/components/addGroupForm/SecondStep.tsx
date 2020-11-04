import React from "react";
import { withTranslation } from "react-i18next";
import { IFormData } from "./interfaces/IFormData";
import Input from "../../../ui/input/Input";
import { InputType } from "../../../ui/input/enums/InputType";
import Button from "../../../ui/_oldButton/Button";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { ButtonType } from "../../../ui/_oldButton/enums/ButtonType";

import userIco from "components/ui/_oldButton/node_modules/assets_path/img/user_ico.png";

interface ISecondStepCallbacks {
	handleChange: (newValue: string, key: string) => void;
	decrementStep: () => void;
	addUser: () => void;
	createGroup: () => void;
}

interface ISecondStepProps extends IReactI18nProps {
	data: IFormData;
	callbacks: ISecondStepCallbacks;
}

const SecondStep: (props: ISecondStepProps) => JSX.Element = props => {
	const cssClasses = {
		container: "formSecondSide__container",
		inputs: "formSecondSide__inputs",
		userIco: "formSecondSide__userIco",
		userList: "formSecondSide__userList",
		userListItem: "formSecondSide__userListItem",
		buttonsGroup: "formSecondSide__buttonsGroup"

	};

	const dataKeys = {
		name: "user.name",
		surname: "user.surname",
		email: "user.email",
	};

	const resources = {
		addBtn: "addBtn",
		prevBtn: "prevBtn",
		createBtn: "groups.addGroupForm.createBtn",
		emailInput: "groups.addGroupForm.email",
		emailInputComment: "groups.addGroupForm.emailComment",
		nameInput: "groups.addGroupForm.name",
		surnameInput: "groups.addGroupForm.surname",
	};

	const { t } = props;

	const renderInputs = () => (
		<div className={cssClasses.inputs}>
			<Input
				type={InputType.Text}
				changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.name)}
				placeholder={t(resources.nameInput)}
				value={props.data.user.name}
			/>
			<Input
				type={InputType.Text}
				changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.surname)}
				placeholder={t(resources.surnameInput)}
				value={props.data.user.surname}
			/>
			<Input
				type={InputType.Text}
				changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.email)}
				placeholder={t(resources.emailInput)}
				commment={t(resources.emailInputComment)}
				value={props.data.user.email}
			/>
			<div className={cssClasses.buttonsGroup}>
				<Button
					onClick={props.callbacks.decrementStep}
					type={ButtonType.Danger}
				>
					{t(resources.prevBtn)}
				</Button>
				<Button onClick={props.callbacks.addUser} >
					{t(resources.addBtn)}
				</Button>
				<Button
					onClick={props.callbacks.createGroup}
					type={ButtonType.Success}
				>
					{t(resources.createBtn)}
				</Button>
			</div>
		</div>
	);

	const renderUserList = () => {
		const createListItems = () => props.data.users.map((user, idx) => (
			<li
				className={cssClasses.userListItem}
				key={idx}
			>
				<img className={cssClasses.userIco} src={userIco} alt={""} />
				{user.name + " " + user.surname}
			</li>
		));
		return (
			<ul className={cssClasses.userList}>
				{createListItems()}
			</ul>
		);
	};

	return (
		<div className={cssClasses.container}>
			{renderInputs()}
			{renderUserList()}
		</div>
	);
};

export default withTranslation()(SecondStep);

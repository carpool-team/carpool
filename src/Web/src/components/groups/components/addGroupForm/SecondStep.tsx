import React, { useState } from "react";
import MediaQuery from "react-responsive";
import { withTranslation } from "react-i18next";
import { IFormData } from "./interfaces/IFormData";
import Input from "../../../ui/input/Input";
import { InputType } from "../../../ui/input/enums/InputType";
import { InputIcon } from "../../../ui/input/enums/InputIcon";
import Button from "../../../ui/button/Button";
import { ButtonColor } from "../../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../../ui/button/enums/ButtonBackground";
import { ButtonSmallIcon } from "../../../ui/buttonSmall/enums/ButtonSmallIcon";
import { ButtonSmallBackground } from "../../../ui/buttonSmall/enums/ButtonSmallBackground";
import { ButtonSmallColor } from "../../../ui/buttonSmall/enums/ButtonSmallColor";
import ButtonSmall from "../../../ui/buttonSmall/ButtonSmall";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { IFormUserData } from "./interfaces/IFormUserData";
import { ValidationType } from "../../../ui/input/enums/ValidationType";
import { each } from "../../../../helpers/UniversalHelper";
import produce from "immer";

interface ISecondStepCallbacks {
	handleChange: (newValue: string, key: string) => void;
	decrementStep: () => void;
	addUser: () => void;
	createGroup: () => void;
	removeUser: (user: IFormUserData) => void;
}

interface ISecondStepProps extends IReactI18nProps {
	data: IFormData;
	callbacks: ISecondStepCallbacks;
}

const SecondStep: (props: ISecondStepProps) => JSX.Element = props => {
	const [inputsValid, setInputsValid] = useState({
		name: false,
		surname: false,
		email: false,
	});

	const [validate, setValidate] = useState(false);

	const cssClasses = {
		container: "addGroupContainerSecond",
		inputs: "addGroupSecondSide__inputs",
		userList: "addGroupSecondSide__userList",
		userListItem: "addGroupSecondSide__userListItem",
		userListItemName: "addGroupSecondSide__userListItemName",
		buttonsGroup: "addGroupSecondSide__buttonsGroup"
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
		basicInfo: "groups.addGroupForm.basicInfo2",
	};

	const addBtnClick = () => {
		if (each(inputsValid, i => i)) {
			props.callbacks.addUser();
			setValidate(false);
			setInputsValid({
				name: false,
				email: false,
				surname: false,
			});
		} else {
			setValidate(true);
		}
	};

	const { t } = props;

	const renderInputs = () => (
		<div className={cssClasses.inputs}>
			<span> {t(resources.basicInfo)}</span>
			<Input
				type={InputType.Text}
				changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.name)}
				placeholder={t(resources.nameInput)}
				icon={InputIcon.User}
				value={props.data.user.name}
				validation={{
					type: ValidationType.Required,
					isValidCallback: isValid => {
						setInputsValid({
							...inputsValid,
							name: isValid,
						});
					},
					validate,
				}}
			/>
			<Input
				type={InputType.Text}
				changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.surname)}
				placeholder={t(resources.surnameInput)}
				icon={InputIcon.User}
				value={props.data.user.surname}
				validation={{
					type: ValidationType.Required,
					isValidCallback: isValid => {
						setInputsValid({
							...inputsValid,
							surname: isValid,
						});
					},
					validate,
				}}
			/>
			<Input
				type={InputType.Text}
				changeHandler={newValue => props.callbacks.handleChange(newValue, dataKeys.email)}
				placeholder={t(resources.emailInput)}
				icon={InputIcon.Mail}
				value={props.data.user.email}
				validation={{
					type: ValidationType.Email,
					isValidCallback: isValid => {
						setInputsValid({
							...inputsValid,
							email: isValid,
						});
					},
					validate,
				}}
			/>
			<div className={cssClasses.buttonsGroup}>
				<Button
					onClick={props.callbacks.decrementStep}
				>
					{t(resources.prevBtn)}
				</Button>
				<Button onClick={addBtnClick}>
					{t(resources.addBtn)}
				</Button>
				<Button
					onClick={props.callbacks.createGroup}
					color={ButtonColor.White}
					background={ButtonBackground.Blue}
				>
					{t(resources.createBtn)}
				</Button>
			</div>
		</div>
	);

	const renderUserList = () => {
		let colorList: string[] = ["#C39BD3", "#7FB3D5", "#48C9B0", "#F9E79F"];
		let colorIndex: number = 0;

		return (
			<ul className={cssClasses.userList}>
				{props.data.users.map((user, idx) => {
					++colorIndex;
					const color = {
						color: colorList[colorIndex % colorList.length]
					};
					return (
						<li key={idx}>
							<div className={cssClasses.userListItem} style={color}>
								<div className={cssClasses.userListItemName}>{user.name} {user.surname}</div>
								<MediaQuery query="(min-width: 900px)">
									<span>{user.email}</span>
								</MediaQuery>
								<ButtonSmall
									icon={ButtonSmallIcon.Close}
									onClick={() => props.callbacks.removeUser(user)}
									color={ButtonSmallColor.Gray}
									background={ButtonSmallBackground.White}
								>
								</ButtonSmall>
							</div>
						</li>
					);
				})}
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

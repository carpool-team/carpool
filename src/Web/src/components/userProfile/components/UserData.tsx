import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useImmer } from "use-immer";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { each } from "../../../helpers/UniversalHelper";
import Input from "../../ui/input/Input";
import { InputType } from "../../ui/input/enums/InputType";
import { InputIcon } from "../../ui/input/enums/InputIcon";
import { ValidationType } from "../../ui/input/enums/ValidationType";
import Button from "../../ui/button/Button";
import { ButtonColor } from "../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../ui/button/enums/ButtonBackground";
import { ProfileList } from "../enums/ProfileList";
import { Popover } from "@material-ui/core";
import { IUserProfileFormData } from "../interfaces/IUserProfileFormData";
import { connect } from "react-redux";
import { DispatchProps, mapDispatchToProps, mapStateToProps, StateProps } from "../store/PropsTypes";
import { useHistory } from "react-router";
import { mainRoutes } from "../../layout/components/LayoutRouter";

interface IUserDataProps extends IReactI18nProps, StateProps, DispatchProps {
	setCurrentList: (List: ProfileList) => void;
}

const UserData: React.FC<IUserDataProps> = (props) => {
	const { t } = props;

	const [firstName, setFirstName] = useState<string>(props.userData.firstName);
	const [lastName, setLastName] = useState<string>(props.userData.lastName);
	const [email, setEmail] = useState<string>(props.userData.email);
	const [inputsValid, setInputsValid] = useImmer({
		name: false,
		surname: false,
		email: false,
	});
	const [validate, setValidate] = useState(false);
	const [popover, setPopover] = useState<boolean>(false);
	const history = useHistory();

	useEffect(() => {
		props.setLoaderVisible(true);
		props.getData();
	}, []);

	useEffect(() => {
		setEmail(props.userData.email);
		setLastName(props.userData.lastName);
		setFirstName(props.userData.firstName);
	}, [props.userData]);

	const resources = {
		email: "auth.registerPanel.email",
		name: "auth.registerPanel.name",
		surname: "auth.registerPanel.surname",
		submit: "auth.userProfile.save",
		label: "auth.userProfile.settings",
		delete: "auth.userProfile.delete",
		password: "auth.userProfile.changePassword",
		deleteConfirm: "auth.userProfile.deleteConfirm",
		yes: "yes",
		no: "no"
	};

	const cssClasses = {
		container: "auth__container",
		inputs: "auth__inputs",
		input: "auth__inputs--input",
		button: "auth__inputs--button",
		buttonContainer: "auth__inputs--buttonContainer",
		buttonOffset: "auth__inputs--buttonOffset",
		label: "auth__inputs--label",
		image: "auth__image--login",
		popoverContainer: "auth__popover"
	};

	const validateForm = () => {
		let isFormValid: boolean = true;
		if (each(inputsValid, i => i)) {
			isFormValid = true;
			setValidate(false);
		} else {
			isFormValid = false;
			setValidate(true);
		}
		return isFormValid;
	};

	const onClickSubmit = () => {
		if (validateForm()) {
			const initialData: IUserProfileFormData = {
				firstName: props.userData.firstName,
				lastName: props.userData.lastName,
				email: props.userData.email,
			};

			const data: IUserProfileFormData = {
				firstName: firstName,
				lastName: lastName,
				email: email,
			};

			// Send req only after changes
			if (JSON.stringify(initialData) !== JSON.stringify(data)) {
				props.updateData(data);
				props.setLoaderVisible(true);
			}
		}
	};

	const handleOpenPopover = () => {
		setPopover(true);
	};

	const handleClosePopover = () => {
		setPopover(false);
	};

	const onDeleteSubmit = () => {
		handleClosePopover();
		props.deleteUser();
		history.push(`/${mainRoutes.default}`);
	};

	const onClickPassword = () => {
		props.setCurrentList(ProfileList.Password);
	};

	return (
		<div className={cssClasses.inputs}>
			<span className={cssClasses.label}>{t(resources.label)}</span>
			<Input
				style={cssClasses.input}
				type={InputType.Text}
				changeHandler={newValue => { setFirstName(newValue); }}
				placeholder={t(resources.name)}
				value={firstName}
				icon={InputIcon.User}
				validation={{
					type: ValidationType.Required,
					isValidCallback: isValid => {
						setInputsValid(draft => {
							draft.name = isValid;
						});
					},
					validate,
				}}
			/>
			<Input
				style={cssClasses.input}
				type={InputType.Text}
				changeHandler={newValue => { setLastName(newValue); }}
				placeholder={t(resources.surname)}
				value={lastName}
				icon={InputIcon.User}
				validation={{
					type: ValidationType.Required,
					isValidCallback: isValid => {
						setInputsValid(draft => {
							draft.surname = isValid;
						});
					},
					validate,
				}}
			/>
			<Input
				style={cssClasses.input}
				type={InputType.Text}
				changeHandler={newValue => {
					// setEmail(newValue); // temporary disable email update
				}}
				placeholder={t(resources.email)}
				value={email}
				icon={InputIcon.Mail}
				validation={{
					type: ValidationType.Email,
					isValidCallback: isValid => {
						setInputsValid(draft => {
							draft.email = isValid;
						});
					},
					validate,
				}}
				disabled={true}
			/>
			{// temporarily disable password changing
			/* <ButtonLink
				onClick={onClickPassword}
				color={ButtonLinkColor.Gray}
				background={ButtonLinkBackground.Gray}
				additionalCssClass={cssClasses.buttonOffset}
			>
				{t(resources.password)}
			</ButtonLink> */}
			<div className={cssClasses.buttonContainer}>
				<Button
					additionalCssClass={cssClasses.button}
					onClick={handleOpenPopover}
					color={ButtonColor.White}
					background={ButtonBackground.Red}
				>
					{t(resources.delete)}
				</Button>
				<Button
					additionalCssClass={cssClasses.button}
					onClick={onClickSubmit}
					color={ButtonColor.White}
					background={ButtonBackground.Blue}
				>
					{t(resources.submit)}
				</Button>
			</div>
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
					<span>{t(resources.deleteConfirm)}</span>
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
		</div>
	);
};

export default withTranslation()(
	connect(mapStateToProps, mapDispatchToProps)(UserData)
);

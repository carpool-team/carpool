import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useImmer } from "use-immer";
import { Key } from "../../../../../constants/Key";
import { each } from "../../../../../helpers/UniversalHelper";
import Button from "../../../../ui/button/Button";
import ButtonSmall from "../../../../ui/buttonSmall/ButtonSmall";
import { ButtonSmallBackground } from "../../../../ui/buttonSmall/enums/ButtonSmallBackground";
import { ButtonSmallColor } from "../../../../ui/buttonSmall/enums/ButtonSmallColor";
import { ButtonSmallIcon } from "../../../../ui/buttonSmall/enums/ButtonSmallIcon";
import AutocompleteWrapper from "../../../../ui/autocompleteWrapper/AutocompleteWrapper";
import { IInviteUser } from "../interfaces/IInviteUser";
import { UserAutocompleteRequest } from "../../../api/userAutocomplete/UserAutocompleteRequest";
import { CssClass } from "../enums/CssClass";
import { Resource } from "../enums/Resource";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";

interface IAddInviteFormProps extends IReactI18nProps {
	addUserToInvite: (user: IInviteUser) => void;
	removeUser: (user: IInviteUser) => void;
	users: IInviteUser[];
	onConfirm: () => void;
	currentAppUserId: string;
}

interface IUserAutocompleteData {
	[email: string]: {
		firstName: string;
		lastName: string;
		appUserId: string;
	};
}

const AddInviteForm: (props: IAddInviteFormProps) => JSX.Element = props => {
	const { t } = props;
	const [inputsValid, setInputsValid] = useImmer({
		email: true,
	});
	const [email, setEmail] = useState<string>(null);
	const [submitted, setSubmitted] = useState(false);
	const [emailsDict, setEmailsDict] = useState<IUserAutocompleteData>({});

	const clearInputs = () => {
		setEmail(null);
	};

	const onAdd = () => {
		if (each(inputsValid, i => i)) {
			props.addUserToInvite({
				email,
				...emailsDict[email],
			});
			setInputsValid(draft => {
				draft.email = false;
			});
			clearInputs();
			setSubmitted(false);
		} else {
			setSubmitted(false);
		}
	};

	useEffect(() => {
		if (submitted) {
			onAdd();
		}
	}, [submitted, inputsValid]);

	const onEnter: (event: KeyboardEvent) => void = event => {
		if (event.key === Key.Enter) {
			setSubmitted(true);
		}
	};

	useEffect(() => {
		document.addEventListener("keypress", onEnter);
		return () => {
			document.removeEventListener("keypress", onEnter);
		};
	}, []);

	const autocompleteCallback: (value: string) => Promise<string[]> = async (value) => {
		const updatedDict: IUserAutocompleteData = {};
		const result: string[] = [];
		if (value && value.length > 0) {
			const request = new UserAutocompleteRequest({
				queries: {
					email: value,
				},
			});
			const response = await request.send();
			if (!response.isError) {
				response.result.forEach(u => {
					if (u.appUserId !== props.currentAppUserId) {
						result.push(u.email);
						updatedDict[u.email] = { ...u };
					}
				});
			}
		}
		setEmailsDict(updatedDict);
		return result;
	};

	const selectedOptionCallback = () => {
		setInputsValid(draft => {
			draft.email = true;
		});
	};

	const confirmButtonClick = () => {
		props.onConfirm();
	};

	const addButtonClick = () => {
		setSubmitted(true);
	};

	const onEmailInputChange: (newValue: string) => void = newValue => {
		setEmail(newValue);
	};

	const renderInputs = () => (
		<div className={CssClass.Inputs}>
			<span> {t(Resource.BasicInfo)}</span>
			<AutocompleteWrapper
				onChange={onEmailInputChange}
				wrapperStyle={{ width: "400px" }}
				placeholder={t(Resource.EmailInput)}
				onSelect={selectedOptionCallback}
				value={email}
				autocompleteCallback={autocompleteCallback}
			/>
			<div className={CssClass.ButtonsGroup}>
				<Button onClick={addButtonClick}>
					{t(Resource.AddBtn)}
				</Button>
				<Button onClick={confirmButtonClick}>
					{t(Resource.Confirm)}
				</Button>
			</div>
		</div>
	);

	const renderUserList = () => {
		let colorList: string[] = ["#C39BD3", "#7FB3D5", "#48C9B0", "#F9E79F"];
		let colorIndex: number = 0;

		return (
			<ul className={CssClass.UserList}>
				{props.users.map((user, idx) => {
					++colorIndex;
					const color = {
						color: colorList[colorIndex % colorList.length]
					};
					return (
						<li key={idx}>
							<div className={CssClass.UserListItem} style={color}>
								<div className={CssClass.UserListItemName}>
									{`${user.firstName} ${user.lastName} (${user.email})`}
								</div>
								<ButtonSmall
									icon={ButtonSmallIcon.Close}
									onClick={() => props.removeUser(user)}
									color={ButtonSmallColor.Gray}
									background={ButtonSmallBackground.White}
								/>
							</div>
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<div className={CssClass.Container}>
			{renderInputs()}
			{renderUserList()}
		</div>
	);
};

export default withTranslation()(AddInviteForm);

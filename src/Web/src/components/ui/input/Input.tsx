import React, { useEffect, useState } from "react";
import { InputType } from "./enums/InputType";
import { InputIcon } from "./enums/InputIcon";
import { getIconClass } from "./Helpers";
import { IValidation } from "./interfaces/IValidation";
import { ValidationType } from "./enums/ValidationType";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { getGeocodingClient } from "../../map/MapBoxHelper";

import "./Input.scss";

export interface IInputBaseProps {
	changeHandler: (newValue: string) => void;
	type: InputType;
	value: string;
	placeholder?: string;
	icon?: InputIcon;
	style?: string;
	label?: {
		text: string;
		inputId: string;
	};
	validation?: IValidation;
	addressCords?: (cords: [number, number]) => void;
	cssProps?: React.CSSProperties;
	disabled?: boolean;
}
interface IInputProps extends IInputBaseProps, IReactI18nProps {
}
interface IAddress {
	place_name: string;
	center: [number, number];
}

const defaultValidationTextKeys = {
	[ValidationType.Email]: "input.validation.emailInvalid",
	[ValidationType.Required]: "input.validation.fieldRequired",
	[ValidationType.Address]: "input.validation.address",
	[ValidationType.Numeric]: "input.validation.numeric",
};

const regexes = {
	[ValidationType.Email]: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	[ValidationType.PostalCode]: /^\d{2}\-\d{3}$/,
	[ValidationType.Numeric]: /^\d+$/,
};

const geocodingClient = getGeocodingClient();

interface IInputValidationData {
	value: string;
	type: ValidationType;
	customValidation?: (value: string) => boolean;
	isAddressPicked?: boolean;
}

const validateInput = (data: IInputValidationData) => {
	if (data.type === ValidationType.Custom && !data.customValidation) {
		throw "Custom validation not provided!";
	}
	switch (data.type) {
		case ValidationType.Email:
			return regexes[data.type].test(data.value);
		case ValidationType.Required:
			return Boolean(data.value);
		case ValidationType.Custom:
			return data.customValidation(data.value);
		case ValidationType.Address:
			return data.isAddressPicked;
		case ValidationType.Numeric:
			return regexes[data.type].test(data.value);
		default:
			return true;
	}
};

const Input = (props: IInputProps) => {
	const [isValid, setIsValid] = useState(true);
	const [autocompleteList, setAutocompleteList] = useState<IAddress[]>(null);
	const [isAutoCompleted, setIsAutoCompleted] = useState(props.validation?.addressAutocompletedInit ?? false);

	const validate = () => {
		if (props.validation) {
			const valid: boolean = validateInput({
				value: props.value,
				type: props.validation.type,
				customValidation: props.validation.customValidation,
				isAddressPicked: isAutoCompleted,
			});
			setIsValid(valid);
			if (props.validation.isValidCallback) {
				props.validation.isValidCallback(valid);
			}
		}
	};

	useEffect(() => {
		console.log("INIT ISAUTO", isAutoCompleted);
		validate();
	}, []);

	useEffect(() => {
		validate();
	}, [props.value, props.validation?.validate]);

	useEffect(() => {
		if (props.type === InputType.Address && !props.value) {
			props.addressCords(null);
			props.changeHandler("");
			setAutocompleteList(null);
			console.log("HERE");
			setIsAutoCompleted(false);
		}
	}, [props.value]);

	const inputBaseClassName: string = "input__input";
	const inputDisabledClassName: string = "input__input--disabled";
	const inputDisabledContainerClassName: string = "input__container--disabled";
	const inputInvalidClassName: string = "input__input--invalid";
	const inputInvalidContainerClassName: string = "input__container--invalid";
	const inputInvalidTextClassName: string = "input__invalidText";
	const inputBaseContainerClassName: string =
		"input__container input__container::before--user";
	const inputGroupContainerClassName: string = "input__groupContainer";
	const inputCommentClassName: string = "input__comment";
	const inputAddressClassName: string = "input__address";
	const inputAddressContainerClassName: string = "input__container--address";
	const checkboxClassName: string = "input__checkbox";
	const checkboxBoxClassName: string = "input__checkbox--box";

	const generalChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!props.disabled) {
			if (props.type === InputType.Checkbox) {
				props.changeHandler(String(event.target.checked));
			} else {
				props.changeHandler(event.target.value);
			}
		}
	};

	let baseInputClasses = [inputBaseClassName];
	let baseContainerClasses = [inputBaseContainerClassName];
	if (props.validation?.validate && !isValid) {
		baseInputClasses = [inputInvalidClassName];
		baseContainerClasses = [inputInvalidContainerClassName];
	}
	if (autocompleteList !== null) {
		baseContainerClasses = [inputAddressContainerClassName];
	}
	if (props.disabled) {
		baseContainerClasses.push(inputDisabledContainerClassName);
		baseInputClasses.push(inputDisabledClassName);
	}

	const onAutocompleteName = async (text: string) => {
		try {
			const response = await geocodingClient
				.forwardGeocode({
					query: text,
					autocomplete: true,
					limit: 3,
					mode: "mapbox.places",
					countries: ["PL"],
					language: ["PL"],
				})
				.send();
			const result: Array<any> = response.body.features;
			const addresses: IAddress[] = result.map(
				(item: { place_name: string; center: [number, number] }) => {
					return {
						place_name: item.place_name,
						center: item.center,
					};
				}
			);
			setAutocompleteList(addresses);
		} catch (err) {
			console.log(err);
		}
	};

	const addressChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.changeHandler(event.target.value);

		console.log("HERE");
		setIsAutoCompleted(false);
		if (event.target.value.length > 3) {
			onAutocompleteName(event.target.value);
		} else {
			setAutocompleteList(null);
		}
	};

	const onAutocompleteClick = (placeName: string, coords: [number, number]) => {
		props.addressCords(coords);
		props.changeHandler(placeName);
		setAutocompleteList(null);
		setIsAutoCompleted(true);
		validate();
	};

	const submitAddressFocusOut = () => {
		if (autocompleteList !== null) {
			props.addressCords(autocompleteList[0].center);
			props.changeHandler(autocompleteList[0].place_name);
			setAutocompleteList(null);
			setIsAutoCompleted(true);
			validate();
		}
	};

	const submitAdressEnter = (e) => {
		if (e.key === "Enter") {
			if (autocompleteList !== null) {
				props.addressCords(autocompleteList[0].center);
				props.changeHandler(autocompleteList[0].place_name);
				setAutocompleteList(null);
				setIsAutoCompleted(true);
				validate();
			}
		}
	};

	const renderAutocompleteAddress = () => {
		if (autocompleteList !== null && autocompleteList.length !== 0) {
			return autocompleteList.map((address: IAddress) => {
				return (
					<div
						key={address.place_name}
						className={inputAddressClassName}
						onMouseDown={() =>
							onAutocompleteClick(address.place_name, address.center)
						}
					>
						{address.place_name}
					</div>
				);
			});
		} else {
			return null;
		}
	};

	const renderValidationMessage = () => {
		const { t } = props;
		if (props.validation?.validate) {
			if (!isValid) {
				return (
					<span className={inputInvalidTextClassName}>
						{props.validation.validationText ??
							t(defaultValidationTextKeys[props.validation?.type])}
					</span>
				);
			}
		}
		return null;
	};

	const renderTextInput = () => (
		<div className={[inputGroupContainerClassName, props.style].join(" ")}>
			<div className={baseContainerClasses.join(" ")}>
				<div className={getIconClass(props.icon)}></div>
				<input
					className={baseInputClasses.join(" ")}
					placeholder={props.placeholder}
					onChange={generalChangeHandler}
					value={props.value ?? ""}
					style={props.cssProps}
					disabled={props.disabled}
				/>
			</div>
			{renderValidationMessage()}
		</div>
	);

	const renderPasswordInput = () => (
		<div className={[inputGroupContainerClassName, props.style].join(" ")}>
			<div className={baseContainerClasses.join(" ")}>
				<div className={getIconClass(props.icon)}></div>
				<input
					className={inputBaseClassName}
					placeholder={props.placeholder}
					onChange={generalChangeHandler}
					value={props.value ?? ""}
					type={"password"}
					disabled={props.disabled}
				/>
			</div>
			{renderValidationMessage()}
		</div>
	);

	const renderAddressInput = () => (
		<div className={[inputGroupContainerClassName, props.style].join(" ")}>
			<div className={baseContainerClasses.join(" ")}>
				<div className={getIconClass(props.icon)}></div>
				<input
					className={inputBaseClassName}
					placeholder={props.placeholder}
					onChange={addressChangeHandler}
					value={props.value ?? ""}
					onBlur={submitAddressFocusOut}
					onKeyPress={submitAdressEnter}
					disabled={props.disabled}
				/>
			</div>
			{renderAutocompleteAddress()}
			{renderValidationMessage()}
		</div>
	);

	const renderCheckbox = () => (
		<div className={[checkboxClassName, props.style].join(" ")}>
			<input
				className={checkboxBoxClassName}
				placeholder={props.placeholder}
				onChange={generalChangeHandler}
				value={props.value ?? ""}
				type={"checkbox"}
				id={props.label?.inputId}
				disabled={props.disabled}
			/>
			{props.label ? (
				<span id={props.label.inputId}>{props.label.text}</span>
			) : null}
		</div>
	);

	const renderInput = () => {
		switch (props.type) {
			case InputType.Text:
				return renderTextInput();
			case InputType.Password:
				return renderPasswordInput();
			case InputType.Checkbox:
				return renderCheckbox();
			case InputType.Address:
				return renderAddressInput();
			default:
				throw "Unhandled input type";
		}
	};

	return <>{renderInput()}</>;
};

export default withTranslation()(Input);

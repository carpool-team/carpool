import React, { useState } from "react";
import { ILocation } from "../../groups/interfaces/ILocation";
import { Popover } from "@material-ui/core";
import Button from "../../ui/button/Button";
import { ButtonColor } from "../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../ui/button/enums/ButtonBackground";
import Input from "../../ui/input/Input";
import { InputType } from "../../ui/input/enums/InputType";
import { useImmer } from "use-immer";
import { InputIcon } from "../../ui/input/enums/InputIcon";
import { ValidationType } from "../../ui/input/enums/ValidationType";
import { each } from "../../../helpers/UniversalHelper";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";

import "./AddressModal.scss";

interface IAddressModalProps extends IReactI18nProps {
	open: boolean;
	onConfirm: (coords: ILocation) => void;
	onCancel: () => void;
}

const AddressModal = (props: IAddressModalProps) => {
	const [inputsValid, setInputsValid] = useImmer({
		location: false,
	});
	const [value, setValue] = useState<string>(null);
	const [validate, setValidate] = useState(false);
	const [addressCoordinates, setAddressCoordinates] = useState<ILocation>(null);

	const { t } = props;

	const cssClasses = {
		button: "inputs__button",
		buttonContainer: "inputs__buttonContainer",
		popoverContainer: "container"
	};

	const resources = {
		addressInput: "addressModal.input",
		confirmBtn: "addressModal.confirmBtn",
		cancelBtn: "addressModal.cancelBtn",
	};

	const confirmBtnClick = () => {
		if (each(inputsValid, i => i)) {
			props.onConfirm(addressCoordinates);
			setValidate(false);
		} else {
			setValidate(true);
		}
	};

	return (
		<Popover
			open={props.open}
			onClose={props.onCancel}
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
				<Input
					type={InputType.Address}
					changeHandler={newValue => setValue(newValue)}
					placeholder={t(resources.addressInput)}
					value={value}
					icon={InputIcon.Location}
					addressCords={coords => {
						if (coords) {
							setAddressCoordinates({
								latitude: coords[1],
								longitude: coords[0],
							});
						} else {
							setAddressCoordinates(null);
						}
					}}
					validation={{
						type: ValidationType.Address,
						isValidCallback: isValid => {
							setInputsValid(draft => {
								draft.location = isValid;
							});
						},
						validate
					}}
				/>
				<div className={cssClasses.buttonContainer}>
					<Button
						additionalCssClass={cssClasses.button}
						onClick={confirmBtnClick}
						color={ButtonColor.White}
						background={ButtonBackground.Green}
					>
						{t(resources.confirmBtn)}
					</Button>
					<Button
						additionalCssClass={cssClasses.button}
						onClick={props.onCancel}
						color={ButtonColor.White}
						background={ButtonBackground.Blue}
					>
						{t(resources.cancelBtn)}
					</Button>
				</div>
			</div>
		</Popover>
	);
};

export default withTranslation()(AddressModal);

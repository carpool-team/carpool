import React, { useState } from "react";
import { ILocation } from "../../../../groups/interfaces/ILocation";
import { Popover } from "@material-ui/core";
import { useImmer } from "use-immer";
import { each } from "../../../../../helpers/UniversalHelper";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import Button from "../../../../ui/button/Button";
import { ButtonBackground } from "../../../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../../../ui/button/enums/ButtonColor";
import Input from "../../../../ui/input/Input";
import { InputType } from "../../../../ui/input/enums/InputType";
import { InputIcon } from "../../../../ui/input/enums/InputIcon";
import { ValidationType } from "../../../../ui/input/enums/ValidationType";
import { IRideFilters } from "../../../../groups/interfaces/IRideFilters";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
	KeyboardTimePicker,
} from "@material-ui/pickers";

import "./SearchRideModal.scss";

interface ISearchRideModalProps extends IReactI18nProps {
	open: boolean;
	onConfirm: (coords: IRideFilters) => void;
	onCancel: () => void;
}

const SearchRideModal = (props: ISearchRideModalProps) => {
	const [inputsValid, setInputsValid] = useImmer({
		location: false,
	});
	const [value, setValue] = useState<string>(null);
	const [validate, setValidate] = useState(false);
	const [addressCoordinates, setAddressCoordinates] = useState<ILocation>(null);
	const [date, setDate] = useState<Date>(null);

	const { t } = props;

	const cssClasses = {
		button: "inputs__button",
		buttonContainer: "inputs__buttonContainer",
		popoverContainer: "container",
		datePicker: "ridesList__datePicker",
	};

	const resources = {
		addressInput: "addressModal.input",
		confirmBtn: "addressModal.confirmBtn",
		cancelBtn: "addressModal.cancelBtn",
		date: "rides.date",
		invalidDate: "rides.invalidDate",
		clear: "common.label.clear",
		ok: "common.label.ok",
		cancel: "common.label.cancel",
		time: "rides.time",
		invalidTime: "rides.invalidTime",
	};

	const confirmBtnClick = () => {
		if (each(inputsValid, i => i)) {
			props.onConfirm({
				location: addressCoordinates,
				date: date,
			});
			setValidate(false);
		} else {
			setValidate(true);
		}
	};

	const handleDateChange = (date: Date) => {
		setDate(date);
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
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						className={cssClasses.datePicker}
						disableToolbar={true}
						variant="dialog"
						format="dd/MM/yyyy"
						margin="dense"
						id="date-picker-inlie"
						label={t(resources.date)}
						value={date}
						onChange={(date: Date) => {
							handleDateChange(date);
						}}
						invalidDateMessage={t(resources.invalidDate)}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
						cancelLabel={t(resources.cancel)}
						okLabel={t(resources.ok)}
						clearable={true}
						clearLabel={t(resources.clear)}
					/>
					<KeyboardTimePicker
						margin="normal"
						id="time-picker"
						className={cssClasses.datePicker}
						label={t(resources.time)}
						value={date}
						onChange={(date: Date) => {
							handleDateChange(date);
						}}
						invalidDateMessage={t(resources.invalidTime)}
						KeyboardButtonProps={{
							"aria-label": "change time",
						}}
					/>
				</MuiPickersUtilsProvider>
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

export default withTranslation()(SearchRideModal);

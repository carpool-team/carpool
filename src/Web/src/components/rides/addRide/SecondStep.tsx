import React, { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import MapBoxRides from "../../map/MapBoxRides";
import Button from "../../ui/button/Button";
import { ButtonColor } from "../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../ui/button/enums/ButtonBackground";
import { ButtonIcon } from "../../ui/button/enums/ButtonIcon";
import MediaQuery from "react-responsive";
import Input from "../../ui/input/Input";
import { InputIcon } from "../../ui/input/enums/InputIcon";
import { InputType } from "../../ui/input/enums/InputType";
import { IRide } from "components/groups/interfaces/IRide";
import DateFnsUtils from "@date-io/date-fns";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import "date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { useImmer } from "use-immer";
import { each, isValidDate } from "../../../helpers/UniversalHelper";
import { ValidationType } from "../../ui/input/enums/ValidationType";
import { address, date } from "faker";
import { IAddRideInput } from "./interfaces/IAddRideInput";
import { RouteComponentProps, withRouter } from "react-router";
import LayoutRouter, {
	mainRoutes,
} from "../../layout/components/LayoutRouter";
import { parseCoords } from "../../../helpers/UniversalHelper";
import { IGroup } from "../../groups/interfaces/IGroup";
import { RideDirection } from "../../groups/api/addRide/AddRideRequest";
import { IRideDays } from "./interfaces/IRideDays";
import { ILocation } from "../../groups/interfaces/ILocation";



export interface IAddRideProps extends IReactI18nProps, RouteComponentProps {
	group: IGroup;
	addRide: () => void;
	setRide: (ride: IAddRideInput) => void;
}

enum PanelType {
	Disposable = "DISPOSABLE",
	Cyclic = "CYCLIC",
}

const AddRideFormScreen: (props: IAddRideProps) => JSX.Element = (props) => {
	const [inputsValid, setInputsValid] = useImmer({
		date: true,
		time: true,
		targetAddress: true,
		seatsNumber: true,
	});

	const resources = {
		disposableBtn: "rides.disposableBtn",
		cyclicBtn: "rides.cyclicBtn",
		fromOrTo: "rides.fromOrTo",
		from: "rides.from",
		to: "rides.to",
		seats: "rides.seats",
		date: "rides.date",
		invalidDate: "rides.invalidDate",
		time: "rides.time",
		invalidTime: "rides.invalidTime",
		addBtn: "rides.addBtn",
		monday: "common.monday",
		tuesday: "common.tuesday",
		wednesday: "common.wednesday",
		thursday: "common.thursday",
		friday: "common.friday",
		saturday: "common.saturday",
		sunday: "common.sunday",
		all: "common.all",
	};

	const cssClasses = {
		container: "ridesAddRideForm",
		listContainer: "ridesAddRideFormLeftContainer",
		buttonsContainer: "ridesAddRideFormButtonsContainer",
		buttonsOutline: "ridesAddRideFormButtonsContainer--outline",
		buttonActive: "ridesAddRideFormButtonActive",
		mapBox: "ridesAddRideFormMapBox",
		buttonsLabel: "ridesAddRideFormButtonsContainer--label",
		checkboxContainer: "ridesAddRideForm__checkboxContainer",
		checkboxLabel: "ridesAddRideForm__checkboxLabel",
		switchActive: "ridesAddRideForm__switchActive",
		datePicker: "ridesAddRideForm__datePicker",
		inputs: "ridesAddRideForm__inputs",
		input: "ridesAddRideForm__input",
		button: "ridesAddRideForm__button",
		daysContainer: "ridesAddRideForm__daysContainer",
		daysColumn: "ridesAddRideForm__daysContainer--column",
	};

	const ids = {
		disposableBtn: "disposableBtn",
		cyclicBtn: "cyclicBtn",
		to: "toId",
		from: "fromId",
	};

	const { t } = props;

	const [switchCssClass, setSwitchCssClass] = useState({
		from: cssClasses.switchActive,
		to: null,
	});
	const [selectedScreen, setSelectedScreen] = useState(PanelType.Disposable);
	const [startgroup, setStartGroup] = useState(false);
	const [location, setLocation] = useState(parseCoords(props.group.location));
	const [direction, setDirection] = useState(RideDirection.To);
	const [userAddressName, setUserAddresName] = useState<string>("");
	const [seats, setSeats] = useState<string>("");
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [days, setDays] = useImmer<IRideDays>({
		all: false,
		monday: false,
		tuesday: false,
		wednesday: false,
		thursday: false,
		friday: false,
		saturday: false,
		sunday: false,
	});

	const userRide: IAddRideInput = {
		recurring: selectedScreen === PanelType.Cyclic,
		weekDays: days,
		groupId: props.group.groupId.toString(),
		rideDirection: direction,
		location: {
			latitude: location[1],
			longitude: location[0],
		},
		seatsLimit: +seats,
		date: selectedDate,
	}

	useEffect(() => {
		props.setRide(userRide)
	}, [selectedDate, location, direction, days, selectedScreen, seats])

	const [submitted, setSubmitted] = useState(false);



	const trySendForm = () => {
		if (each(inputsValid, (i) => i)) {
			const input: IAddRideInput = {
				recurring: selectedScreen === PanelType.Cyclic,
				weekDays: days,
				groupId: props.group.groupId.toString(),
				rideDirection: direction,
				location: {
					latitude: location[1],
					longitude: location[0],
				},
				seatsLimit: +seats,
				date: selectedDate,
			};
			props.setRide(input);
			props.addRide();
			props.history.push(`/${mainRoutes.rides}`);
		} else {
			console.log(inputsValid);
			console.log(userRide)
			setSubmitted(false);
		}
	};

	useEffect(() => {
		if (submitted) {
			trySendForm();
		}
	}, [submitted, inputsValid]);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
	};

	const setCurrentList = (list: PanelType) => {
		if (list !== selectedScreen) {
			let groupsBtn = document.getElementById(ids.disposableBtn);
			groupsBtn?.classList.toggle(cssClasses.buttonActive);
			let invitesBtn = document.getElementById(ids.cyclicBtn);
			invitesBtn?.classList.toggle(cssClasses.buttonActive);
		}
		setSelectedScreen(list);
	};

	const setUserCoordinates = (coords: [number, number]) => {
		setLocation(coords);
	};

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStartGroup(event.target.checked);
		if (event.target.checked) {
			setSwitchCssClass({ from: null, to: cssClasses.switchActive });
			setDirection(RideDirection.From);
		} else {
			setSwitchCssClass({ from: cssClasses.switchActive, to: null });
			setDirection(RideDirection.To);
		}
	};

	const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === "all") {
			setDays(draft => {
				draft.monday = event.target.checked;
				draft.tuesday = event.target.checked;
				draft.wednesday = event.target.checked;
				draft.thursday = event.target.checked;
				draft.friday = event.target.checked;
				draft.saturday = event.target.checked;
				draft.sunday = event.target.checked;
				draft.all = event.target.checked;
			});
		} else {
			setDays(draft => {
				draft[event.target.name] = event.target.checked
			});
		}
	};

	const LocationSwitch = withStyles({
		switchBase: {
			color: "#6b98d1",
			"&$checked": {
				color: "#6b98d1",
			},
			"&$checked + $track": {
				backgroundColor: "#707070",
			},
			"& + $track": {
				backgroundColor: "#707070",
			},
		},
		checked: {},
		track: {},
	})(Switch);

	const DaysSwitch = withStyles({
		switchBase: {
			color: "#6b98d1",
			"&$checked": {
				color: "#6b98d1",
			},
			"&$checked + $track": {
				backgroundColor: "#4a90e8",
			},
			"& + $track": {
				backgroundColor: "#707070",
			},
		},
		checked: {},
		track: {},
	})(Switch);

	const renderDisposablePanel = () => {
		return (
			<div className={cssClasses.inputs}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						className={cssClasses.datePicker}
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="dense"
						id="date-picker-inlie"
						label={t(resources.date)}
						value={selectedDate}
						onChange={(date: Date, value?: string) => {
							handleDateChange(date);
							setInputsValid((draft) => {
								draft.date = isValidDate(date);
							});
						}}
						invalidDateMessage={t(resources.invalidDate)}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
					<KeyboardTimePicker
						margin="normal"
						id="time-picker"
						className={cssClasses.datePicker}
						label={t(resources.time)}
						value={selectedDate}
						onChange={(date: Date, value?: string) => {
							handleDateChange(date);
							setInputsValid((draft) => {
								draft.time = isValidDate(date);
							});
						}}
						invalidDateMessage={t(resources.invalidTime)}
						KeyboardButtonProps={{
							"aria-label": "change time",
						}}
					/>
				</MuiPickersUtilsProvider>
				<div className={cssClasses.checkboxLabel}>{t(resources.fromOrTo)}</div>
				<div className={cssClasses.checkboxContainer}>
					<span className={switchCssClass.from} id={ids.from}>
						{" "}
						{t(resources.from)}
					</span>
					<FormControlLabel
						control={
							<LocationSwitch
								size="medium"
								checked={startgroup}
								onChange={handleSwitchChange}
							/>
						}
						label=""
					/>
					<span className={switchCssClass.to} id={ids.to}>
						{" "}
						{t(resources.to)}
					</span>
				</div>
				{startgroup ? (
					<Input
						style={cssClasses.input}
						type={InputType.Address}
						changeHandler={(newValue) => setUserAddresName(newValue)}
						placeholder={"Adres " + t(resources.from)}
						value={userAddressName}
						icon={InputIcon.Location}
						addressCords={(coords) => setUserCoordinates(coords)}
						validation={{
							validate: submitted,
							type: ValidationType.Address,
							isValidCallback: (isValid) => {
								setInputsValid((draft) => {
									draft.targetAddress = isValid;
								});
							},
						}}
					/>
				) : (
						<Input
							style={cssClasses.input}
							type={InputType.Address}
							changeHandler={(newValue) => setUserAddresName(newValue)}
							placeholder={"Adres " + t(resources.to) + " przejazdu"}
							value={userAddressName}
							icon={InputIcon.Location}
							addressCords={(coords) => setUserCoordinates(coords)}
							validation={{
								validate: submitted,
								type: ValidationType.Address,
								isValidCallback: (isValid) => {
									setInputsValid((draft) => {
										draft.targetAddress = isValid;
									});
								},
							}}
						/>
					)}
				<Input
					style={cssClasses.input}
					type={InputType.Text}
					changeHandler={(newValue) => setSeats(newValue)}
					placeholder={t(resources.seats)}
					value={seats}
					icon={InputIcon.Seats}
					validation={{
						validate: submitted,
						type: ValidationType.Numeric,
						isValidCallback: (isValid) => {
							setInputsValid((draft) => {
								draft.seatsNumber = isValid;
							});
						},
					}}
				/>
				<Button
					className={cssClasses.button}
					onClick={() => trySendForm()}
					color={ButtonColor.White}
					background={ButtonBackground.Blue}
				>
					{t(resources.addBtn)}
				</Button>
			</div>
		);
	};

	const renderCyclicPanel = () => {
		return (
			<div className={cssClasses.inputs}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardTimePicker
						margin="normal"
						id="time-picker"
						className={cssClasses.datePicker}
						label={t(resources.time)}
						value={selectedDate}
						onChange={(date: Date, value?: string) => {
							handleDateChange(date);
							setInputsValid((draft) => {
								draft.time = isValidDate(date);
							});
						}}
						KeyboardButtonProps={{
							"aria-label": "change time",
						}}
					/>
				</MuiPickersUtilsProvider>
				<div className={cssClasses.daysContainer}>
					<div className={cssClasses.daysColumn}>
						<FormControlLabel
							control={
								<DaysSwitch
									size="medium"
									checked={days.all}
									onChange={handleDayChange}
									name="all"
								/>
							}
							label={t(resources.all)}
						/>
						<FormControlLabel
							control={
								<DaysSwitch
									size="medium"
									checked={days.monday}
									onChange={handleDayChange}
									name="monday"
								/>
							}
							label={t(resources.monday)}
						/>
						<FormControlLabel
							control={
								<DaysSwitch
									size="medium"
									checked={days.tuesday}
									onChange={handleDayChange}
									name="tuesday"
								/>
							}
							label={t(resources.tuesday)}
						/>
						<FormControlLabel
							control={
								<DaysSwitch
									size="medium"
									checked={days.wednesday}
									onChange={handleDayChange}
									name="wednesday"
								/>
							}
							label={t(resources.wednesday)}
						/>
					</div>
					<div className={cssClasses.daysColumn}>
						<FormControlLabel
							control={
								<DaysSwitch
									size="medium"
									checked={days.thursday}
									onChange={handleDayChange}
									name="thursday"
								/>
							}
							label={t(resources.thursday)}
						/>
						<FormControlLabel
							control={
								<DaysSwitch
									size="medium"
									checked={days.friday}
									onChange={handleDayChange}
									name="friday"
								/>
							}
							label={t(resources.friday)}
						/>
						<FormControlLabel
							control={
								<DaysSwitch
									size="medium"
									checked={days.saturday}
									onChange={handleDayChange}
									name="saturday"
								/>
							}
							label={t(resources.saturday)}
						/>
						<FormControlLabel
							control={
								<DaysSwitch
									size="medium"
									checked={days.sunday}
									onChange={handleDayChange}
									name="sunday"
								/>
							}
							label={t(resources.sunday)}
						/>
					</div>
				</div>
				<div className={cssClasses.checkboxLabel}>{t(resources.fromOrTo)}</div>
				<div className={cssClasses.checkboxContainer}>
					<span className={switchCssClass.from} id={ids.from}>
						{" "}
						{t(resources.from)}
					</span>
					<FormControlLabel
						control={
							<LocationSwitch
								size="medium"
								checked={startgroup}
								onChange={handleSwitchChange}
							/>
						}
						label=""
					/>
					<span className={switchCssClass.to} id={ids.to}>
						{" "}
						{t(resources.to)}
					</span>
				</div>
				{startgroup ? (
					<Input
						style={cssClasses.input}
						type={InputType.Address}
						changeHandler={(newValue) => setUserAddresName(newValue)}
						placeholder={"Adres " + t(resources.from)}
						value={userAddressName}
						icon={InputIcon.Location}
						addressCords={(coords) => setUserCoordinates(coords)}
						validation={{
							validate: submitted,
							type: ValidationType.Address,
							isValidCallback: (isValid) => {
								setInputsValid((draft) => {
									draft.targetAddress = isValid;
								});
							},
						}}
					/>
				) : (
						<Input
							style={cssClasses.input}
							type={InputType.Address}
							changeHandler={(newValue) => setUserAddresName(newValue)}
							placeholder={"Adres " + t(resources.to) + " przejazdu"}
							value={userAddressName}
							icon={InputIcon.Location}
							addressCords={(coords) => setUserCoordinates(coords)}
							validation={{
								validate: submitted,
								type: ValidationType.Address,
								isValidCallback: (isValid) => {
									setInputsValid((draft) => {
										draft.targetAddress = isValid;
									});
								},
							}}
						/>
					)}
				<Input
					style={cssClasses.input}
					type={InputType.Text}
					changeHandler={(newValue) => setSeats(newValue)}
					placeholder={t(resources.seats)}
					value={seats}
					icon={InputIcon.Seats}
					validation={{
						validate: submitted,
						type: ValidationType.Numeric,
						isValidCallback: (isValid) => {
							setInputsValid((draft) => {
								draft.seatsNumber = isValid;
							});
						},
					}}
				/>
				<Button
					className={cssClasses.button}
					onClick={() => trySendForm()}
					color={ButtonColor.White}
					background={ButtonBackground.Blue}
				>
					{t(resources.addBtn)}
				</Button>
			</div>
		);
	};

	let list: JSX.Element;

	switch (selectedScreen) {
		case PanelType.Disposable:
			list = renderDisposablePanel();
			break;
		case PanelType.Cyclic:
		default:
			list = renderCyclicPanel();
			break;
	}

	return (
		<div className={cssClasses.listContainer}>
			<div className={cssClasses.buttonsContainer}>
				<Button
					id={ids.disposableBtn}
					background={ButtonBackground.Gray}
					className={cssClasses.buttonActive}
					color={ButtonColor.Gray}
					onClick={() => setCurrentList(PanelType.Disposable)}
				>
					{t(resources.disposableBtn)}
				</Button>
				<Button
					id={ids.cyclicBtn}
					background={ButtonBackground.Gray}
					color={ButtonColor.Gray}
					onClick={() => setCurrentList(PanelType.Cyclic)}
				>
					{t(resources.cyclicBtn)}
				</Button>
			</div>
			<div className={cssClasses.buttonsOutline}></div>
			{list}
		</div>
	);
};

export default withRouter(withTranslation()(AddRideFormScreen));

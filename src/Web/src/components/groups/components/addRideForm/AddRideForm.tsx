import React, { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import { IGroup } from "../../interfaces/IGroup";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import MapBoxRides from "../../../map/MapBoxRides";
import Button from "../../../ui/button/Button";
import { ButtonColor } from "../../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../../ui/button/enums/ButtonBackground";
import { ButtonIcon } from "../../../ui/button/enums/ButtonIcon";
import MediaQuery from "react-responsive";
import Input from "../../../ui/input/Input";
import { InputIcon } from "../../../ui/input/enums/InputIcon";
import { InputType } from "../../../ui/input/enums/InputType";
import { IRide } from "components/groups/interfaces/IRide";

export interface IAddGroupProps extends IReactI18nProps {
	group: IGroup;
}

enum PanelType {
	Disposable = "DISPOSABLE",
	Cyclic = "CYCLIC",
}
enum StartPoint {
	Group = "GROUP",
	User = "USER"
}

const AddRideFormScreen: React.FunctionComponent<IAddGroupProps> = props => {
	const resources = {
		disposableBtn: "rides.disposableBtn",
		cyclicBtn: "rides.cyclicBtn",
		addRideLabel: "rides.addRideLabel",
		fromOrTo: "rides.fromOrTo",
		from: "rides.from",
		to: "rides.to"
	};

	const cssClasses = {
		container: "ridesAddRideForm",
		listContainer: "ridesAddRideFormLeftContainer",
		buttonsContainer: "ridesAddRideFormButtonsContainer",
		buttonsOutline: "ridesAddRideFormButtonsContainer--outline",
		buttonActive: "ridesAddRideFormButtonActive",
		mapBox: "ridesAddRideFormMapBox",
		buttonsLabel: "ridesAddRideFormButtonsContainer--label"
	};

	const ids = {
		disposableBtn: "disposableBtn",
		cyclicBtn: "cyclicBtn",
	};
	const inputKeys = {
		from: "fromStartPoint",
		to: "toStartPoint"
	};

	const [selectedScreen, setSelectedScreen] = useState(PanelType.Disposable);

	const [fromCheckBox, setFromCheckBox] = useState(false);
	const [toCheckBox, setToCheckBox] = useState(true);

	const [fromAddressCoordinates, setFromAddressCoordinates] = useState([0, 0]);
	const [toAddressCoordinates, setToAddressCoordinates] = useState([0, 0]);

	const [userAddressCoordinates, setUserAddressCoordinates] = useState([0, 0]);
	const [userAddressName, setUserAddresName] = useState(undefined);

	const ride: IRide = {
		id : "fdsfds",
		owner: {
			userId: "fdasfda",
			firstName: "Maciej",
			lastName: "Sobkowiak",
			vehicle: "Mazda"
		},
		ownerId: "fdsa",
		destination: {
			latitude: toAddressCoordinates[0],
			longitude: toAddressCoordinates[1]
		},
		startingLocation: {
			latitude: fromAddressCoordinates[0],
			longitude: fromAddressCoordinates[1]
		},
		date: "314212351",
		isUserParticipant: true,
		group: props.group,
		groupId: props.group.id
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

	const renderDisposablePanel = () => {
		const { t } = props;

		const setFromCheckboxState = (newValue: string) => {
			console.log(newValue);
			if (newValue === "true") {
				console.log(props.group);
				setToCheckBox(false);
				setFromCheckBox(true);
				setFromAddressCoordinates([props.group.location.latitude, props.group.location.longitude]);
				setToAddressCoordinates(userAddressCoordinates);
			}	else {
				setToCheckBox(true);
				setFromCheckBox(false);
				setToAddressCoordinates([props.group.location.latitude, props.group.location.longitude]);
				setFromAddressCoordinates(userAddressCoordinates);
			}
		};
		const setToCheckBoxState = (newValue: string) => {
			if (newValue === "true") {
				setToCheckBox(true);
				setFromCheckBox(false);
				setToAddressCoordinates([props.group.location.latitude, props.group.location.longitude]);
				setFromAddressCoordinates(userAddressCoordinates);
			}	else {
				setToCheckBox(false);
				setFromCheckBox(true);
				setFromAddressCoordinates([props.group.location.latitude, props.group.location.longitude]);
				setToAddressCoordinates(userAddressCoordinates);
			}
		};
		const setUserCoordinates = (coords: [number, number]) => {
			setUserAddressCoordinates(coords);
			if (toCheckBox) {
				setFromAddressCoordinates(coords);
			}	else {
				setToAddressCoordinates(coords);
			}
		};

		return(
			<div>
				<div>
					{t(resources.fromOrTo)}
					<Input
						changeHandler={ (newValue) => setFromCheckboxState(newValue) }
						value={""}
						type={InputType.Checkbox}
						checked={fromCheckBox}
						label={{
							text: t(resources.from),
							inputId: inputKeys.from,
						}}
					/>
					<Input
						changeHandler={newValue => setToCheckBoxState(newValue) }
						value={""}
						type={InputType.Checkbox}
						checked={toCheckBox}
						label={{
							text: t(resources.to),
							inputId: inputKeys.to
						}}
					/>
				</div>
				<div>
				<Input
					type={InputType.Address}
					changeHandler={newValue => setUserAddresName(newValue)}
					placeholder={"adres " + t(resources.from)}
					value={(userAddressName)}
					icon={InputIcon.Location}
					addressCords={coords => setUserCoordinates(coords)}
				/>
				</div>
				{userAddressCoordinates}
			</div>
		);
	};

	const renderCyclicPanel = () => {
		return(
			<div>
				dfs
			</div>
		);
	};

	const renderMap = () => {
		return (
			<MapBoxRides ride={ride} />
		);
	};

	const renderLeftPanel = () => {
		const { t } = props;

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
				<div className={cssClasses.buttonsLabel}>
					{t(resources.addRideLabel)}
					<span> {props.group.name}</span>
				</div>
				<div className={cssClasses.buttonsContainer}>
					<Button id={ids.disposableBtn} background={ButtonBackground.Gray} className={cssClasses.buttonActive} color={ButtonColor.Gray} onClick={() => setCurrentList(PanelType.Disposable)}>
						{t(resources.disposableBtn)}
					</Button>
					<Button id={ids.cyclicBtn} background={ButtonBackground.Gray} color={ButtonColor.Gray} onClick={() => setCurrentList(PanelType.Cyclic)}>
						{t(resources.cyclicBtn)}
					</Button>
				</div>
				<div className={cssClasses.buttonsOutline}></div>
				{list}
			</div>
		);
	};

	return (
		<div className={cssClasses.container}>
			{renderLeftPanel()}
			<MediaQuery query="(min-width: 900px)">
				<div className={cssClasses.mapBox}>
					{renderMap()}
				</div>
			</MediaQuery>
		</div>
	);
};

export default withTranslation()(AddRideFormScreen);

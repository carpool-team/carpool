import React, { useState } from "react";
import { initReactI18next } from "react-i18next";
import { IGroup } from "../../interfaces/IGroup";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import MapBoxPicker from "../../../map/MapBoxPicker";
import Button from "../../../ui/button/Button";
import { ButtonColor } from "../../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../../ui/button/enums/ButtonBackground";
import { ButtonIcon } from "../../../ui/button/enums/ButtonIcon";
import MediaQuery from "react-responsive";

export interface IAddGroupProps extends IReactI18nProps {
	group: IGroup;
}

enum PanelType {
	Disposable = "DISPOSABLE",
	Cyclic = "CYCLIC",
}

const AddRideFormScreen: React.FunctionComponent<IAddGroupProps> = props => {
	const resources = {
		disposableBtn: "rides.disposableBtn",
		cyclicBtn: "rides.cyclicBtn",
		addRideLabel: "rides.addRideLabel"
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

	const [selectedScreen, setSelectedScreen] = useState(PanelType.Disposable);
	const [addressCoordinates, setAddressCoordinates] = useState(undefined);

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
		return(
			<div>
				dfs
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
			<MapBoxPicker location={addressCoordinates}/>
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

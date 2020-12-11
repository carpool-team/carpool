import React, { Component, useState } from "react";
import produce from "immer";
import _ from "lodash";
import { withTranslation } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IReactI18nProps } from "../../../components/system/resources/IReactI18nProps";
import ButtonLink from "../../ui/button/Button";
import { ButtonLinkColor } from "../../ui/buttonLink/enums/ButtonLinkColor";
import { ButtonLinkBackground } from "../../ui/buttonLink/enums/ButtonLinkBackground";
import { mainRoutes } from "../../layout/components/LayoutRouter";
import FirstStep from "./FirstStep";
// import SecondStep from "./SecondStep";
import { IGroup } from "components/groups/interfaces/IGroup";
import MediaQuery from "react-responsive";
import MapBoxRides from "../../map/MapBoxRides";
import { IRide } from "components/groups/interfaces/IRide";
import { RideDirection } from "../../../components/groups/api/addRide/AddRideRequest";
import { ILocation } from "../../groups/interfaces/ILocation";


interface IAddRideFormScreenProps extends IReactI18nProps, RouteComponentProps {
}

const AddRide = (props: IAddRideFormScreenProps) => {

	const { url } = props.match;
	const { t } = props
	const groups: IGroup[] = [];

	const cssClasses = {
		container: "groupsManagement",
		listContainer: "groupsManagementListContainer",
		buttonsContainer: "groupsManagementButtonsContainer",
		buttonsOutline: "groupsManagementButtonsContainer--outline",
		buttonActive: "groupsManagementButtonActive",
		mapBox: "groupsManagementMapBox",
	};
	const resources = {
		addRideBtn: "groups.addGroupBtn",
	};

	const [step, setStep] = useState(1);
	const [groupSelected, setGroupSelected] = useState<IGroup>(null);
	const [direction, setDirection] = useState(RideDirection.To);
	const [location, setLocation] = useState<ILocation>({ latitude: 0, longitude: 0 });

	const ride: IRide = {
		rideId: "fdsfds",
		owner: {
			id: "fdasfda",
			firstName: "Maciej",
			lastName: "Sobkowiak",
			vehicle: "Mazda",
			rating: 0,
		},
		location,
		rideDate: new Date(),
		group: groupSelected,
		rideDirection: direction,
		price: 0,
	};



	const incrementStep = () => {
		setStep(step + 1);
	}

	const setgroup = () => {

	}

	const decrementStep = () => {
		setStep(step - 1)
	}

	const addRide = () => {

	}


	const renderFirstStep = () => (
		<FirstStep
			groups={groups ?? []} setGroupSelected={group => setGroupSelected(group)}
		/>
	)

	const renderSecondStep = () => (
		// <SecondStep	
		// />
		<></>
	)

	const renderMap = () => {
		return (
			<MapBoxRides ride={ride} />
		);
	};

	const renderLeftPanel = () => {
		let screen: JSX.Element;
		switch (step) {
			case 1: {
				screen = renderFirstStep();
				break;
			}
			case 2: {
				screen = renderFirstStep();
				break;
			}
			default: {
				throw "Unhandled add group form step";
			}
		}

		return (
			<div className={cssClasses.listContainer}>
				<div className={cssClasses.buttonsContainer}>
					"Fdsfds"
				</div>
				<div className={cssClasses.buttonsOutline}></div>
				{screen}
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
	)
}

export default withTranslation()(withRouter(AddRide));

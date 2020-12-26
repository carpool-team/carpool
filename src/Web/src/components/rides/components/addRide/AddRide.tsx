import React, { useEffect, useState } from "react";
import _ from "lodash";
import { withTranslation } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IReactI18nProps } from "../../../../components/system/resources/IReactI18nProps";
import { mainRoutes } from "../../../layout/components/LayoutRouter";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { IGroup } from "components/groups/interfaces/IGroup";
import MediaQuery from "react-responsive";
import MapBoxRides from "../../../map/MapBoxRides";
import { IRide } from "components/groups/interfaces/IRide";
import { RideDirection } from "../../../../components/groups/api/addRide/AddRideRequest";
import { ILocation } from "../../../groups/interfaces/ILocation";
import { IAddRideAction, IGetGroupsAction } from "../../../groups/store/Types";
import { IGroupsState } from "../../../groups/store/State";
import { connect } from "react-redux";
import { getGroups } from "../../../groups/store/Actions";
import { addRide } from "../../../groups/store/Actions";
import { IAddRideInput } from "./interfaces/IAddRideInput";
import MapBoxGroups from "../../../map/MapBoxGroups";


interface IStatePropsType {
	groups: IGroupsState;
}
interface IStateToProps {
	groups: IGroup[];
}

const mapStateToProps = (state: IStatePropsType): IStateToProps => ({
	groups: state.groups.groups
});

interface IDispatchPropsType {
	getGroups: (userOnly: boolean) => IGetGroupsAction;
	addRide: (input: IAddRideInput) => IAddRideAction;
}

const mapDispatchToProps: IDispatchPropsType = {
	getGroups,
	addRide,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface IAddRideFormScreenProps extends IReactI18nProps, RouteComponentProps, StateProps, DispatchProps {
}

const AddRide = (props: IAddRideFormScreenProps) => {

	useEffect(() => {
		props.getGroups(true);
	}, []);

	const { url } = props.match;
	const { t } = props
	const groups: IGroup[] = props.groups;

	const cssClasses = {
		container: "groupsManagement",
		listContainer: "groupsManagementListContainer",
		buttonsContainer: "groupsManagementButtonsContainer",
		buttonsOutline: "groupsManagementButtonsContainer--outline",
		buttonActive: "groupsManagementButtonActive",
		mapBox: "groupsManagementMapBox",
		buttonsLabel: "ridesAddRideFormButtonsContainer--label",
	};
	const resources = {
		addRideBtn: "groups.addGroupBtn",
		pickGroupLabel: "rides.pickGroupLabel",
		addRideLabel: "rides.addRideLabel",
	};

	const [step, setStep] = useState(1);
	const [groupSelected, setGroupSelected] = useState<IGroup>(null);
	const [direction, setDirection] = useState(RideDirection.To);
	const [location, setLocation] = useState<ILocation>();
	const [userRide, setUserRide] = useState<IAddRideInput>();

	useEffect(() => {
		if (groupSelected) {
			incrementStep()
			setLocation(groupSelected?.location);
		}
	}, [groupSelected]);

	const ride: IRide = {
		rideId: "",
		owner: {
			id: "",
			firstName: "",
			lastName: "",
			vehicle: "",
			rating: 0,
		},
		location,
		rideDate: new Date(),
		group: groupSelected,
		rideDirection: direction,
		price: 0,
	};

	const SendForm = () => {
		props.addRide(userRide);
		props.history.push(`/${mainRoutes.rides}`);
	};

	const incrementStep = () => {
		setStep(step + 1);
	}

	const decrementStep = () => {
		setStep(step - 1)
	}

	const setRide = (userRide: IAddRideInput) => {
		setUserRide(userRide)
		setLocation(userRide.location)
		setDirection(userRide.rideDirection)
	}

	const renderFirstStep = () => (
		<FirstStep
			groups={groups ?? []} setGroupSelected={group => setGroupSelected(group)}
		/>
	)

	const renderSecondStep = () => (
		<SecondStep
			group={groupSelected} addRide={SendForm} setRide={setRide}
		/>
	)
	const renderMapFirstStep = () => (
		// <MapBoxPicker />
		<MapBoxGroups getGroupsCallback={() => groups} setSelectedGroupCallback={(id) => (id)} />
	)
	const renderMapSecondStep = () => (
		<MapBoxRides ride={ride} />
	)

	const renderMap = () => {
		let map: JSX.Element;
		switch (step) {
			case 1: {
				map = renderMapFirstStep();
				break;
			}
			case 2: {
				map = renderMapSecondStep();
				break;
			}
			default: {
				throw "Unhandled add group form step";
			}
		}
		return (
			map
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
				screen = renderSecondStep();
				break;
			}
			default: {
				throw "Unhandled add group form step";
			}
		}

		return (
			<div className={cssClasses.listContainer}>
				<div className={cssClasses.buttonsLabel}>
					{step === 1 &&
						t(resources.pickGroupLabel)
					}
					{step === 2 &&
						<>
							{t(resources.addRideLabel)}
							<span> {groupSelected?.name}</span>
						</>
					}
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

export default withTranslation()(
	withRouter(
		connect(mapStateToProps, mapDispatchToProps)(AddRide)
	)
);

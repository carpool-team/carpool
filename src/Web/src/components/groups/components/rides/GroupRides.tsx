import React, { useState } from "react";
import { IGroup } from "../../interfaces/IGroup";
import GroupDetailedView, { IGroupDetailedViewProps } from "../detailedView/GroupDetailedView";
import RidesList from "./components/RidesList";
import { useHistory } from "react-router";
import Button from "../../../ui/button/Button";
import { ButtonBackground } from "../../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../../ui/button/enums/ButtonColor";
import LayoutRouter from "../../../layout/components/LayoutRouter";
import ridesExample from "../../../../examples/exampleRides";
import { IRide } from "../../../../components/groups/interfaces/IRide";
import MediaQuery from "react-responsive";
import MapBoxRides from "../../../map/MapBoxRides";

interface IGroupRidesProps extends IGroupDetailedViewProps {

}

const GroupRides = (props: IGroupRidesProps) => {
	const history = useHistory();
	const cssClasses = {
		container: "ridesContainer",
		leftPanel: "rides--leftPanel",
		rightPanel: "rides--rightPanel",
		rightTopPanel: "rides--rightPanel__top",
		rightBottomPanel: "rides--rightPanel__bottom",
		leftLabels: "rides--leftPanel__label",
		leftList: "rides--leftPanel__list",
		leftOutline: "rides--leftPanel__outline",
		leftLabelsText: "rides--leftPanel__text"
	};

	const rides: IRide[] = ridesExample;
	const [selectedRide, setSelectedRide] = useState(null);

	const setRide = (ride: IRide) => {
		if (ride !== null) {
			setSelectedRide(ride);
		}
	};

	return (
		<GroupDetailedView group={props.group}>
			<div className={cssClasses.leftPanel}>
				<div className={cssClasses.leftLabels}>
					<Button onClick={() => {
						history.push(`/${LayoutRouter.routes.groups}`);
					}}
						background={ButtonBackground.Blue}
						color={ButtonColor.White}
					>
						{"Wróć"}
					</Button>
					<Button background={ButtonBackground.Blue} color={ButtonColor.White}>
						Dodaj
				</Button>
					<div className={cssClasses.leftLabelsText}> {props.group.name}</div>
				</div>
				<div className={cssClasses.leftOutline}></div>
				<div className={cssClasses.leftList}>
					<RidesList rideSelected={selectedRide} setRide={setRide} rides={rides} />
				</div>
			</div>
			<MediaQuery query="(min-width: 900px)">
				<div className={cssClasses.rightPanel}>
					<MapBoxRides ride={selectedRide}></MapBoxRides>
				</div>
			</MediaQuery>
		</GroupDetailedView>

	);
};

export default GroupRides;

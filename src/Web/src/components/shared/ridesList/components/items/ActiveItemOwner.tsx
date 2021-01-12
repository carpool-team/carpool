import React, { useState } from "react";
import Button from "../../../../ui/button/Button";
import { ButtonBackground } from "../../../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../../../ui/button/enums/ButtonColor";
import { parseCoords } from "../../../../../helpers/UniversalHelper";
import { convertDate } from "../../../../../helpers/UniversalHelper";

import IListItemProps from "../../interfaces/IRidesItemProps";
import { getGeocodingClient } from "../../../../map/MapBoxHelper";
import ButtonSmall from "../../../../ui/buttonSmall/ButtonSmall";
import { ButtonSmallColor } from "../../../../ui/buttonSmall/enums/ButtonSmallColor";
import { ButtonSmallIcon } from "../../../../ui/buttonSmall/enums/ButtonSmallIcon";
import { ButtonSmallBackground } from "../../../../ui/buttonSmall/enums/ButtonSmallBackground";

const geocodingClient = getGeocodingClient();

const ActiveItemOwner = (props: IListItemProps) => {

	const cssClasses = {
		mainRow: "ridesList--mainRow",
		address: "ridesList--mainRow__address",
		icon: "ridesList--mainRow__icon",
		toLabel: "ridesList--mainRow__to",
		fromLabel: "ridesList--mainRow__from",
		activeContainer: "ridesListActive",
		activeButtonContainer: "ridesListActive--button",
		activeBottomRow: "ridesListActive--bottomRow",
		activeJoinButton: "ridesListActive--joinButton",
		activeDriver: "ridesListActive--driver",
		activeDate: "ridesListActive--date",
		activeSeats: "ridesListActive--seats",
		activeCar: "ridesListActive--car",
		participantLabel: "ridesListActive--participantLabel",
		participantContainer: "ridesListActive--participantContainer",
		participantName: "ridesListActive--participantContainer--name",
		participantButton: "ridesListActive--participantContainer--button",
		noParticipants: "ridesListActive--participantContainer--noParticipants"
	};

	const [loading, setLoading] = useState(null);
	const [placeName, setPlaceName] = useState(null);
	const onGetName = async (coords: [number, number]) => {
		try {
			setLoading(true);
			const response = await geocodingClient
				.reverseGeocode({
					query: coords,
					mode: "mapbox.places",
				})
				.send();
			const result = response.body.features[0];
			if (result !== undefined && result.hasOwnProperty("place_name")) {
				setPlaceName(result.place_name);
			} else {
				setPlaceName(" Błąd pobrania nazwy lokalizacji ");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};
	const resources = {
		noParticipants: "rides.noParticipants",
		participantsLabel: "rides.participantsLabel"
	}

	const color = {
		color: props.color
	};
	const borderColor = {
		borderColor: props.color
	};
	const backgroundColor = {
		backgroundColor: props.color
	};

	if (!placeName && !loading && placeName !== undefined) {
		onGetName(parseCoords(props.ride.location));
	}
	let fromName: string;
	let toName: string;

	switch (props.ride.rideDirection) {
		case 0: {
			fromName = placeName;
			toName = props.ride.group.name;
			break;
		}
		case 1: {
			toName = placeName;
			fromName = props.ride.group.name;
			break;
		}
		default: {
			toName = "";
			fromName = "";
			break;
		}
	}


	const renderParticipants = () => {
		if (props.ride.stops.length) {
			return (
				props.ride.stops.map((stop, idx) => {
					return (
						<div id={stop.participant.id} className={cssClasses.participantContainer}>
							<div className={cssClasses.participantName}>
								{stop.participant.firstName}  {stop.participant.lastName}
							</div>
							<ButtonSmall
								style={cssClasses.participantButton}
								icon={ButtonSmallIcon.Close}
								onClick={() => { }}
								color={ButtonSmallColor.Red}
								background={ButtonSmallBackground.Gray}
							/>
						</div>
					)
				}))
		} else {
			return (
				<div className={cssClasses.noParticipants}>
					{props.t(resources.noParticipants)}
				</div>
			)
		}
	}

	return (
		<li className={cssClasses.activeContainer} key={props.ride.rideId}>
			<div className={cssClasses.activeButtonContainer} >
				<div className={cssClasses.mainRow} style={borderColor}>
					<div className={cssClasses.icon} style={color}>	</div>
					<div className={cssClasses.address} >
						<div className={cssClasses.fromLabel}>
							{!loading &&
								fromName
							}
						</div>
						<div className={cssClasses.toLabel}>
							{!loading &&
								toName
							}
						</div>
					</div>
				</div>
				<div className={cssClasses.activeBottomRow}>
					<div className={cssClasses.activeDate}>
						{convertDate(props.ride.rideDate.toString())}
					</div>
					<div className={cssClasses.participantLabel}>
						{props.t(resources.participantsLabel)}
					</div>
					{renderParticipants()}
					<Button style={backgroundColor} background={ButtonBackground.Blue} color={ButtonColor.White} className={cssClasses.activeJoinButton}>
						{"Usuń"}
					</Button>
				</div>
			</div>
		</li>
	);
};

export default (ActiveItemOwner);

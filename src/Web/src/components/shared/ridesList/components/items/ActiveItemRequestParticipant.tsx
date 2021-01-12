import React, { useState } from "react";
import { parseCoords } from "../../../../../helpers/UniversalHelper";
import { convertDate } from "../../../../../helpers/UniversalHelper";
import { getGeocodingClient } from "../../../../map/MapBoxHelper";
import IRequestsItemProps from "../../interfaces/IRequestsItemProps";

const geocodingClient = getGeocodingClient();

const ActiveItemRequestParticipant = (props: IRequestsItemProps) => {

	const { t } = props;

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
		activeStatus: "ridesListActive--status"
	};

	const resources = {
		accepted: "requests.accepted",
		pending: "requests.pending",
		declined: "requests.declined",
		status: "requests.status"
	}

	const [loading, setLoading] = useState(null);
	const [placeName, setPlaceName] = useState(null);
	const [status, setStatus] = useState<string>(null)

	const onGetName = async (coords: [number, number]) => {
		try {
			setLoading(true);
			const response = await geocodingClient
				.reverseGeocode({
					query: coords,
					mode: "mapbox.places",
					countries: ["PL"],
					language: ["PL"],
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

	const getStatus = () => {
		if (props.request.isAccepted) {
			setStatus(t(resources.accepted))
		} else {
			if (props.request.isPending) {
				setStatus(t(resources.pending))
			} else {
				setStatus(t(resources.declined))
			}
		}
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
		onGetName(parseCoords(props.request.ride.location));
	}
	let fromName: string;
	let toName: string;

	switch (props.request.ride.rideDirection) {
		case 0: {
			fromName = placeName;
			toName = props.request.ride.group.name;
			break;
		}
		case 1: {
			toName = placeName;
			fromName = props.request.ride.group.name;
			break;
		}
		default: {
			toName = "";
			fromName = "";
			break;
		}
	}
	if (!status) {
		getStatus()
	}
	return (
		<li className={cssClasses.activeContainer} key={props.request.rideRequestId}>
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
					<div className={cssClasses.activeStatus}>
						{t(resources.status) + status}
					</div>
					<div className={cssClasses.activeDate}>
						{convertDate(props.request.ride.date.toString())}
					</div>
					<div className={cssClasses.activeDriver}>
						Kierowca: {props.request.rideOwner.firstName} {props.request.rideOwner.lastName}
					</div>
				</div>
			</div>
		</li>
	);
};

export default (ActiveItemRequestParticipant);

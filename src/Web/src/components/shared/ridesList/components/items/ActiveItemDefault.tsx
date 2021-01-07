import React, { useState } from "react";
import { parseCoords } from "../../../../../helpers/UniversalHelper";
import IListItemProps from "../../interfaces/IRidesItemProps";
import { convertDate } from "../../../../../helpers/UniversalHelper";
import { getGeocodingClient } from "../../../../map/MapBoxHelper";
import Button from "../../../../ui/buttonSmall/ButtonSmall";
import AddressModal from "../../../addressModal/AddressModal";

const geocodingClient = getGeocodingClient();

const ActiveItemDefault = (props: IListItemProps) => {

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
	};

	const [popover, setPopover] = useState(false);
	const [loading, setLoading] = useState<boolean>(null);
	const [placeName, setPlaceName] = useState<string>(null);
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

	const color = {
		color: props.color,
	};
	const borderColor = {
		borderColor: props.color,
	};
	const backgroundColor = {
		backgroundColor: props.color,
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

	const resources = {
		joinBtnLabel: "common.joinRide",
	};

	return (
		<li className={cssClasses.activeContainer} key={props.ride.rideId}>
			<div className={cssClasses.activeButtonContainer}>
				<div className={cssClasses.mainRow} style={borderColor}>
					<div className={cssClasses.icon} style={color}>
						{" "}
					</div>
					<div className={cssClasses.address}>
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
					<div className={cssClasses.activeDriver}>
						Kierowca: {props.ride.owner.firstName} {props.ride.owner.lastName}
					</div>
					<div className={cssClasses.activeCar}>
						{props.ride.owner.vehicle}
					</div>
					<div className={cssClasses.activeSeats}>Wolne miejsca: {"2"}</div>
					{props.joinRideCallback ?
						<>
							<Button onClick={() => setPopover(true)}>
								{props.t(resources.joinBtnLabel)}
							</Button>
							<AddressModal
								open={popover}
								onCancel={() => setPopover(false)}
								onConfirm={(coords) => {
									setPopover(false);
									props.joinRideCallback(props.ride, coords);
								}}
							/>
						</> : null}
				</div>
			</div>
		</li>
	);
};

export default (ActiveItemDefault);

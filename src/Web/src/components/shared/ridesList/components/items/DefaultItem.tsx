import React, { useState } from "react";
import { parseCoords } from "../../../../../helpers/UniversalHelper";
import IListItemProps from "../../interfaces/IRidesItemProps";
import { convertDate } from "../../../../../helpers/UniversalHelper";
import { getGeocodingClient } from "../../../../map/MapBoxHelper";
import { getColor, getRideMatchLabel } from "../../../../../helpers/RidesHelper";

const geocodingClient = getGeocodingClient();

const DefaultItem = (props: IListItemProps) => {

	const cssClasses = {
		mainRow: "ridesList--mainRow",
		bottomRow: "ridesList--bottomRow",
		button: "ridesList--button",
		address: "ridesList--mainRow__address",
		icon: "ridesList--mainRow__icon",
		toLabel: "ridesList--mainRow__to",
		fromLabel: "ridesList--mainRow__from",
		driver: "ridesList--bottomRow__driver",
		rideExt: "ridesList--bottomRow__rideExtension",
		bar: "ridesList__matchBar",
	};

	const resources = {
		placeNameGetErrorLabel: "common.label.placeNameGetError",
	};

	const [loading, setLoading] = useState<boolean>(null);
	const [placeName, setPlaceName] = useState<string>(null);

	const hasExtension = (props.rideExtension ?? -1) > -1;

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
				setPlaceName(props.t(resources.placeNameGetErrorLabel));
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

	const filterKey = props.filterKey?.toLowerCase();
	if (!filterKey || (filterKey && (toName.toLowerCase().includes(filterKey) || fromName.toLowerCase().includes(filterKey)))) {
		return (
			<li key={props.ride.rideId}>
				<button
					className={cssClasses.button}
					onClick={() => props.setRide(props.ride)}
				>
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
					<div className={cssClasses.bottomRow}>
						<div className={cssClasses.driver}>
							{convertDate(props.ride.rideDate.toString())}
						</div>
						{hasExtension &&
							<div
								className={cssClasses.rideExt}
								style={{
									color: getColor(props.rideExtension)
								}}
							>
								{getRideMatchLabel(props.rideExtension)}
							</div>
						}
					</div>
					{hasExtension && <div className={cssClasses.bar} style={{
						width: props.rideExtension > 100 ? "100%" : props.rideExtension + "%",
						background: getColor(props.rideExtension),
					}} />}
				</button>
			</li>
		);
	} else {
		return null;
	}
};

export default (DefaultItem);

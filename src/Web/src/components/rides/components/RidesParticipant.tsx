import React, { useState, useEffect } from "react";
import { colorList } from "../../../scss/colorList";
import { TFunction } from "i18next";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import { IRide } from "components/groups/interfaces/IRide";
import mapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import mapConfig from "../../map/mapConfig";
import Button from "../../ui/button/Button";
import { ButtonBackground } from "../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../ui/button/enums/ButtonColor";
import moment from "moment";
import { da } from "date-fns/locale";
import "../Rides.scss";
import { RideDirection } from "../../groups/api/addRide/AddRideRequest";
import {parseCoords} from "../../../helpers/UniversalHelper";
import { parse } from "@babel/core";

interface IRidesListProps extends IReactI18nProps {
	rides: IRide[];
	rideSelected: IRide;
	setRide: (ride: IRide) => void;
	firstDay: string;
	lastDay: string;
}
interface IListItemProps {
	ride: IRide;
	color: string;
	t: TFunction;
	setRide: (ride: IRide) => void;
}
const geocodingClient = mapboxGeocoding({ accessToken: mapConfig.mapboxKey });

const RidesParticipant = (props: IRidesListProps) => {

	const cssClasses = {
		list: "ridesListContainer",
		listContainer: "ridesListContainer__days",
		mainRow: "ridesList--mainRow",
		bottomRow: "ridesList--bottomRow",
		button: "ridesList--button",
		address: "ridesList--mainRow__address",
		icon: "ridesList--mainRow__icon",
		seats: "ridesList--mainRow__seats",
		toLabel: "ridesList--mainRow__to",
		fromLabel: "ridesList--mainRow__from",
		driver: "ridesList--bottomRow__driver",
		activeContainer: "ridesListActive",
		activeButtonContainer: "ridesListActive--button",
		activeBottomRow: "ridesListActive--bottomRow",
		activeJoinButton: "ridesListActive--joinButton",
		activeDriver: "ridesListActive--driver",
		activeDate: "ridesListActive--date",
		activeSeats: "ridesListActive--seats",
		activeCar: "ridesListActive--car",
		day: "day",
		dayLabel: "day__label"
	};

	let colorIndex: number = 0;

	const convertDate = (date: string) => {
		if (date) {
			let d = new Date(date);
			let dateOutput =
				d.getUTCFullYear() + "/" +
				("0" + (d.getUTCMonth() + 1)).slice(-2) + "/" +
				("0" + d.getUTCDate()).slice(-2) + " " +
				("0" + d.getUTCHours()).slice(-2) + ":" +
				("0" + d.getUTCMinutes()).slice(-2) + ":" +
				("0" + d.getUTCSeconds()).slice(-2);
			return dateOutput;
		}
	};

	const rides: IRide[] = props.rides;

	const DefaultItem = (props: IListItemProps) => {

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
				if ( result !== undefined && result.hasOwnProperty("place_name")){
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
			color: props.color
		};
		const borderColor = {
			borderColor: props.color
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

		return (
			<li key={props.ride.rideId}>
				<button
					className={cssClasses.button}
					onClick={() => props.setRide(props.ride)}
				>
					<div className={cssClasses.mainRow} style={borderColor}>
						<div className={cssClasses.icon} style={color}>	</div>
						<div className={cssClasses.address}>
							<div className={cssClasses.fromLabel}>
							{!loading &&
									fromName
								}
							</div>
							<div className={cssClasses.toLabel}>
								{ !loading &&
									toName
								}
							</div>
						</div>
					</div>
					<div className={cssClasses.bottomRow}>
						<div className={cssClasses.driver}>
							{convertDate(props.ride.rideDate.toString())}
						</div>
					</div>
				</button>
			</li>
		);
	};

	const ActiveItem = (props: IListItemProps) => {

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
				if ( result !== undefined && result.hasOwnProperty("place_name")){
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
								{ !loading &&
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
						<div className={cssClasses.activeSeats}>
							Wolne miejsca: {"2"}
						</div>
						<Button style={backgroundColor} background={ButtonBackground.Blue} color={ButtonColor.White} className={cssClasses.activeJoinButton}>
							Zrezygnuj
						</Button>
					</div>
				</div>
			</li>
		);
	};

	const days = [];
	for (let m = moment(props.firstDay); m.diff(props.lastDay, "days") <= 0; m.add(1, "days")) {
		days.push(m.format());
	}

	const { t } = props;

	const renderItem = (color: string, ride: IRide, day: string) => {
		if (moment(ride.rideDate).format("YYYY-MM-DD") === moment(day).format("YYYY-MM-DD")) {
			if (props.rideSelected && props.rideSelected.rideId === ride.rideId) {
				return (
					<React.Fragment key={ride.rideId}>
						<ActiveItem
							ride={ride}
							color={color}
							t={t}
							setRide={props.setRide}
						/>
					</React.Fragment>
				);
			} else {
				return (
					<React.Fragment key={ride.rideId}>
						<DefaultItem
							ride={ride}
							color={color}
							t={t}
							setRide={props.setRide}
						/>
					</React.Fragment>
				);
			}
		}
	};

	return (
		<ul className={cssClasses.listContainer}>
			{days.map((day) => {
				return (
					<div className={cssClasses.day} key={day}>
						<div className={cssClasses.dayLabel}>{moment(day).format("DD.MM")}</div>
						<ul className={cssClasses.list}>
							{rides.map((ride) => {
								++colorIndex;
								const color = colorList[colorIndex % colorList.length];
								return (
									renderItem(color, ride, day)
								);
							}
							)}
						</ul>
					</div>
				);
			})}
		</ul>
	);
};

export default withTranslation()(RidesParticipant);

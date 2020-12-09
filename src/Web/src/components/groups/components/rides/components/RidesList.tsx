import React, { useState, useEffect } from "react";
import { colorList } from "../../../../../scss/colorList";
import { TFunction } from "i18next";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import { IRide } from "components/groups/interfaces/IRide";
import mapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import mapConfig from "../../../../map/mapConfig";
import Button from "../../../../ui/button/Button";
import { ButtonBackground } from "../../../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../../../ui/button/enums/ButtonColor";
import SearchBar from "../../../../ui/searchBar/SearchBar";
import { useImmer } from "use-immer";

interface IRidesListProps extends IReactI18nProps {
	rides: IRide[];
	rideSelected: IRide;
	setRide: (ride: IRide) => void;
}
interface IListItemProps {
	ride: IRideNames;
	color: string;
	t: TFunction;
	setRide: (ride: IRide) => void;
}
interface IRideNames extends IRide {
	toName?: string;
	fromName?: string;
}
const geocodingClient = mapboxGeocoding({ accessToken: mapConfig.mapboxKey });

const RidesList = (props: IRidesListProps) => {
	const [searchKey, setSearchKey] = useState(null);

	const cssClasses = {
		list: "ridesList",
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
	};

	let colorIndex: number = 0;

	const GetNames = (ridesProps: IRide[]) => {
		const rides: IRideNames[] = ridesProps;
		if (rides) {
			rides.map((ride) => {
				const [loading, setLoading] = useState(null);
				const [fromName, setfromName] = useState(null);
				const [toName, setToName] = useState(null);

				const onGetFromName = async (coords: [number, number]) => {
					try {
						setLoading(true);
						const response = await geocodingClient
							.reverseGeocode({
								query: coords,
								mode: "mapbox.places",
							})
							.send();
						const result = response.body.features[0];
						setfromName(result.place_name);
						ride.fromName = result.place_name;
					} catch (err) {
						console.log(err);
					} finally {
						setLoading(false);
					}
				};

				const onGetToName = async (coords: [number, number]) => {
					try {
						setLoading(true);
						const response = await geocodingClient
							.reverseGeocode({
								query: coords,
								mode: "mapbox.places",
							})
							.send();
						const result = response.body.features[0];
						setToName(result.place_name);
						ride.toName = result.place_name;
					} catch (err) {
						console.log(err);
					} finally {
						setLoading(false);
					}
				};
				useEffect(() => {
					if (ride) {
						if (!fromName || !toName) {
							onGetFromName([
								ride.startingLocation.latitude,
								ride.startingLocation.longitude,
							]);
							onGetToName([
								ride.destination.latitude,
								ride.destination.longitude,
							]);
						}
					}
				});
			});
		}
		return rides;
	};

	const convertDate = (date: string) => {
		if (date) {
			let d = new Date(date);
			let dateOutput =
				d.getUTCFullYear() +
				"/" +
				("0" + (d.getUTCMonth() + 1)).slice(-2) +
				"/" +
				("0" + d.getUTCDate()).slice(-2) +
				" " +
				("0" + d.getUTCHours()).slice(-2) +
				":" +
				("0" + d.getUTCMinutes()).slice(-2) +
				":" +
				("0" + d.getUTCSeconds()).slice(-2);
			return dateOutput;
		}
	};

	const rides: IRide[] = GetNames(props.rides);

	const DefaultItem = (props: IListItemProps) => {
		const color = {
			color: props.color,
		};
		const borderColor = {
			borderColor: props.color,
		};

		return (
			<li key={props.ride.id}>
				<button
					className={cssClasses.button}
					onClick={() => props.setRide(props.ride)}
				>
					<div className={cssClasses.mainRow} style={borderColor}>
						<div className={cssClasses.icon} style={color}>
							{" "}
						</div>
						<div className={cssClasses.address}>
							<div className={cssClasses.fromLabel}>{props.ride.fromName}</div>
							<div className={cssClasses.toLabel}>{props.ride.toName}</div>
						</div>
					</div>
					<div className={cssClasses.bottomRow}>
						<div className={cssClasses.driver}>
							{convertDate(props.ride.date)}
						</div>
					</div>
				</button>
			</li>
		);
	};

	const ActiveItem = (props: IListItemProps) => {
		const color = {
			color: props.color,
		};
		const borderColor = {
			borderColor: props.color,
		};
		const backgroundColor = {
			backgroundColor: props.color,
		};

		return (
			<li className={cssClasses.activeContainer} key={props.ride.id}>
				<div className={cssClasses.activeButtonContainer}>
					<div className={cssClasses.mainRow} style={borderColor}>
						<div className={cssClasses.icon} style={color}>
							{" "}
						</div>
						<div className={cssClasses.address}>
							<div className={cssClasses.fromLabel}>{props.ride.fromName}</div>
							<div className={cssClasses.toLabel}>{props.ride.toName}</div>
						</div>
					</div>
					<div className={cssClasses.activeBottomRow}>
						<div className={cssClasses.activeDate}>
							{convertDate(props.ride.date)}
						</div>
						<div className={cssClasses.activeDriver}>
							Kierowca: {props.ride.owner.firstName} {props.ride.owner.lastName}
						</div>
						<div className={cssClasses.activeCar}>
							{props.ride.owner.vehicle}
						</div>
						<div className={cssClasses.activeSeats}>Wolne miejsca: {"2"}</div>
						<Button
							style={backgroundColor}
							background={ButtonBackground.Blue}
							color={ButtonColor.White}
							className={cssClasses.activeJoinButton}
						>
							Dołącz
						</Button>
					</div>
				</div>
			</li>
		);
	};

	return (
		<ul className={cssClasses.list}>
			<SearchBar
				keyword={searchKey}
				setKeyword={(nv) => {
					setSearchKey(nv);
				}}
			/>
			{rides.map((ride) => {
				++colorIndex;
				const color = colorList[colorIndex % colorList.length];
				const { t } = props;
				return (
					<React.Fragment key={ride.id}>
						{(() => {
							if (props.rideSelected && props.rideSelected.id === ride.id) {
								return (
									<ActiveItem
										ride={ride}
										color={color}
										t={t}
										setRide={props.setRide}
									/>
								);
							} else {
								return (
									<DefaultItem
										ride={ride}
										color={color}
										t={t}
										setRide={props.setRide}
									/>
								);
							}
						})()}
					</React.Fragment>
				);
			})}
		</ul>
	);
};

export default withTranslation()(RidesList);

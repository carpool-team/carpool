import React from "react";
import { colorList } from "../../../../../scss/colorList";
import { TFunction } from "i18next";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import { IRide } from "components/groups/interfaces/IRide";
import { from } from "rxjs";
import Button from "../../../../ui/button/Button";
import {ButtonBackground} from "../../../../ui/button/enums/ButtonBackground";
import {ButtonColor} from "../../../../ui/button/enums/ButtonColor";
import MediaQuery from "react-responsive";

interface IRidesListProps extends IReactI18nProps {
	rides: IRide[];
	rideSelected: IRide;
	setRide: (ride: IRide) => void;
}
interface IListItemProps {
	ride: IRide;
	color: string;
	t: TFunction;
	setRide: (ride: IRide) => void;
}

const RidesList = (props: IRidesListProps) => {

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

	const rides: IRide[] = props.rides;

	const DefaultItem = (props: IListItemProps) => {
		const color = {
			color: props.color
		};
		const borderColor = {
			borderColor: props.color
		};

		return (
			<li key={props.ride.id}>
				<button
					className={cssClasses.button}
					onClick={() => props.setRide(props.ride)}
				>
					<div className={cssClasses.mainRow} style={borderColor}>
						<div className={cssClasses.icon} style={color}>	</div>
						<div className={cssClasses.address}>
							<div className={cssClasses.fromLabel}>
								{props.ride.destination.latitude}
							</div>
							<div className={cssClasses.toLabel}>
								{props.ride.startingLocation.latitude}
							</div>
						</div>
						{/* <div className={cssClasses.seats}>2/4</div> */}
					</div>
					<div className={cssClasses.bottomRow}>
						<div className={cssClasses.driver}>
							{props.ride.date}
						</div>
					</div>
				</button>
			</li>
		);
	};

	const ActiveItem = (props: IListItemProps) => {
		const color = {
			color: props.color
		};
		const borderColor = {
			borderColor: props.color
		};
		const backgroundColor = {
			backgroundColor: props.color
		};

		return (
			<li className={cssClasses.activeContainer} key={props.ride.id}>
				<div className={cssClasses.activeButtonContainer} >
					<div className={cssClasses.mainRow} style={borderColor}>
						<div className={cssClasses.icon} style={color}>	</div>
						<div className={cssClasses.address} >
							<div className={cssClasses.fromLabel}>
								{props.ride.destination.latitude}
							</div>
							<div className={cssClasses.toLabel}>
								{props.ride.startingLocation.latitude}
							</div>
						</div>
					</div>
					<div className={cssClasses.activeBottomRow}>
						<div className={cssClasses.activeDate}>
							{props.ride.date}
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
							Dołącz
						</Button>
					</div>
				</div>
			</li>
		);
	};

	return (
		<ul className={cssClasses.list}>
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
											setRide ={props.setRide}
										/>);
									} else {
										return (
											<DefaultItem
											ride={ride}
											color={color}
											t={t}
											setRide ={props.setRide}
											/>);
									}
								})()}
						</React.Fragment>
				);
			})}
		</ul>
	);
};

export default withTranslation()(RidesList);

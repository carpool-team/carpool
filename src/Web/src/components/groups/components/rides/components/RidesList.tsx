import React from "react";
import { colorList } from "../../../../../scss/colorList";
import { TFunction } from "i18next";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import { IRide } from "components/groups/interfaces/IRide";
import { from } from "rxjs";

interface IRidesListProps extends IReactI18nProps {
	rides: IRide[];
}
interface IListItemProps {
	ride: IRide;
	color: string;
	t: TFunction;
}

const RidesList = (props: IRidesListProps) => {

	const cssClasses = {
		list: "ridesList",
		mainRow: "ridesList--mainRow",
		bottomRow: "ridesList--bottomRow",
		button: "ridesList--button",
		mainLabel: "ridesList--mainRow__label",
		icon: "ridesList--mainRow__icon",
		seats: "ridesList--mainRow__seats",
		toLabel: "ridesList--bottomRow__to",
		fromLabel: "ridesList--bottomRow__from",
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
				>
					<div className={cssClasses.mainRow}>
						<div className={cssClasses.icon} style={color}>	</div>
						<div className={cssClasses.mainLabel} style={borderColor}>
							Kierowca: {props.ride.owner.firstName} {props.ride.owner.lastName}
						</div>
						<div className={cssClasses.seats}>2/4</div>
					</div>
					<div className={cssClasses.bottomRow}>
						{/* TODO pobierać adres z mapboxa na podstawie lokalizacji */}
						<div className={cssClasses.fromLabel}>
							{props.ride.destination.latitude}
						</div>
						<div className={cssClasses.toLabel}>
							{props.ride.startingLocation.latitude}
						</div>
					</div>
				</button>
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
						<DefaultItem
							ride={ride}
							color={color}
							t={t}
						/>
				);
			})}
		</ul>
	);
};

export default withTranslation()(RidesList);

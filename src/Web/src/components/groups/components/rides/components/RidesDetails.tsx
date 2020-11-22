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

interface IRidesListProps extends IReactI18nProps {
	ride: IRide;
}

const RidesDetails = (props: IRidesListProps) => {

	const cssClasses = {
		container: "ridesDetails",
		firstRow: "ridesDetails--firstRow",
		secondRow: "ridesDetails--secondRow",
		thirdRow: "ridesDetails--thirdRow",
		address: "ridesDetails--firstRow__address",
		date: "ridesDetails--secondRow__date",
		driver: "ridesDetails--secondRow__driver",
		seats: "ridesDetails--thirdRow__seats",
		car: "ridesDetails--thirdRow__car"

	};

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.firstRow}>
				<Button background={ButtonBackground.Blue} color={ButtonColor.White}>
					Dołącz
				</Button>
				<div className={cssClasses.address}>
					Początek trasy: {props.ride.startingLocation.latitude}
				</div>
				<div className={cssClasses.address}>
					Koniec trasy: {props.ride.startingLocation.latitude}
				</div>
			</div>
			<div className={cssClasses.secondRow}>
				<div className={cssClasses.date}>
					Data: {props.ride.date}
				</div>
				<div className={cssClasses.driver}>
					Kierowca: {props.ride.owner.firstName} {props.ride.owner.lastName}
				</div>
			</div>
			<div className={cssClasses.thirdRow}>
				<div className={cssClasses.seats}>
					Liczba wolnych miejsc: 2
				</div>
				<div className={cssClasses.car}>
					Samochód: {props.ride.owner.vehicle}
				</div>
			</div>
		</div>
	);
};

export default withTranslation()(RidesDetails);

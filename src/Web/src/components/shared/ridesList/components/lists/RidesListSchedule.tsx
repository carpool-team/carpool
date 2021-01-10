import React from "react";
import { colorList } from "../../../../../scss/colorList";
import { withTranslation } from "react-i18next";
import { IRide } from "components/groups/interfaces/IRide";
import moment from "moment";
import { IRidesListProps } from "../../interfaces/IRidesListProps";
import ActiveItemOwner from "../items/ActiveItemOwner";
import ActiveItemParticipant from "../items/ActiveItemParticipant";
import DefaultItem from "../items/DefaultItem";
import { RidesListType } from "../../enums/RidesListType";

const RidesListSchedule = (props: IRidesListProps) => {

	const cssClasses = {
		list: "ridesListContainer",
		listContainer: "ridesListContainer__days",
		day: "day",
		dayLabel: "day__label"
	};

	const { t } = props;

	const renderOwnerItem = (color: string, ride: IRide, day: string) => {
		if (moment(ride.rideDate).format("YYYY-MM-DD") === moment(day).format("YYYY-MM-DD")) {
			if (props.rideSelected && props.rideSelected.rideId === ride.rideId) {
				return (
					<React.Fragment key={ride.rideId}>
						<ActiveItemOwner
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

	const renderParticipantItem = (color: string, ride: IRide, day: string) => {
		if (moment(ride.rideDate).format("YYYY-MM-DD") === moment(day).format("YYYY-MM-DD")) {
			if (props.rideSelected && props.rideSelected.rideId === ride.rideId) {
				return (
					<React.Fragment key={ride.rideId}>
						<ActiveItemParticipant
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

	const renderItem = (color: string, ride: IRide, day: string) => {
		let item: JSX.Element;
		switch (props.listType) {
			case RidesListType.Owner: {
				item = renderOwnerItem(color, ride, day);
				break;
			}
			case RidesListType.Participant: {
				item = renderParticipantItem(color, ride, day);
				break;
			}
		}
		return item;
	};

	let colorIndex: number = 0;
	const rides: IRide[] = props.rides;
	const days = [];

	for (let m = moment(props.firstDay); m.diff(props.lastDay, "days") <= 0; m.add(1, "days")) {
		days.push(m.format());
	}

	return (
		<ul className={cssClasses.listContainer}>
			{days.map((day) => {
				return (
					<div className={cssClasses.day} key={day}>
						<div className={cssClasses.dayLabel}>{moment(day).format("DD.MM")}</div>
						<ul className={cssClasses.list}>
							{rides && rides.map((ride) => {
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

export default withTranslation()(RidesListSchedule);

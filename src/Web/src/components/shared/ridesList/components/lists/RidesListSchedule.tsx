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
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { ILeaveRideAction, IDeleteRideAction, IDeletePassengerAction } from "../../../../rides/store/Types";
import { leaveRide, deleteRide, deletePassenger } from "../../../../rides/store/Actions";
import { connect } from "react-redux";
import { LoadingStatus } from "../../../enum/LoadingStatus";
import LoaderBlock from "../../../../ui/loaderBlock/LoaderBlock";

interface IDispatchPropsType {
	leaveRide: (rideId: string) => ILeaveRideAction;
	deleteRide: (rideId: string) => IDeleteRideAction;
	deletePassenger: (rideId: string, userId: string) => IDeletePassengerAction;
}

const mapDispatchToProps: IDispatchPropsType = {
	leaveRide,
	deleteRide,
	deletePassenger,
};

export type DispatchProps = typeof mapDispatchToProps;

interface IRidesListScheduleProps extends IRidesListProps, DispatchProps, IReactI18nProps {
}

const RidesListSchedule = (props: IRidesListScheduleProps) => {

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
							deleteRide={props.deleteRide}
							deletePassenger={props.deletePassenger}
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
							leaveRideCallback={props.leaveRide}
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
			default:
				item = null;
				break;
		}
		return item;
	};

	let colorIndex: number = 0;
	const rides: IRide[] = props.rides;
	const days: string[] = [];

	for (let m = moment(props.firstDay); m.diff(props.lastDay, "days") <= 0; m.add(1, "days")) {
		days.push(m.format());
	}

	const renderItems = (day: string) => {
		switch (props.loadingStatus) {
			case LoadingStatus.Loading:
				return <LoaderBlock />;
			default:
				if (rides) {
					return rides.map((ride) => {
						++colorIndex;
						const color = colorList[colorIndex % colorList.length];
						return renderItem(color, ride, day);
					});
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
							{renderItems(day)}
						</ul>
					</div>
				);
			})}
		</ul>
	);
};

export default connect(null, mapDispatchToProps)(
	withTranslation()(RidesListSchedule)
);

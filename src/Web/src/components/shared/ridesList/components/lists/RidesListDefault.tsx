import React, { useState } from "react";
import { colorList } from "../../../../../scss/colorList";
import { withTranslation } from "react-i18next";
import { IRide } from "components/groups/interfaces/IRide";
import { IRidesListProps } from "../../interfaces/IRidesListProps";
import ActiveItemJoin from "../items/ActiveItemJoin";
import ActiveItemDefault from "../items/ActiveItemDefault";
import DefaultItem from "../items/DefaultItem";
import { RidesListType } from "../../enums/RidesListType";
import SearchBar from "../../../../ui/searchBar/SearchBar";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { IGetRidesAvailableAction } from "../../../../groups/store/Types";
import { getRidesAvailable } from "../../../../groups/store/Actions";
import { connect } from "react-redux";
import { RideDirection } from "../../../../groups/api/addRide/AddRideRequest";

interface IDispatchPropsType {
	getRidesAvailable: (groupId: string, date?: Date, direction?: RideDirection) => IGetRidesAvailableAction;
}

const mapDispatchToProps: IDispatchPropsType = {
	getRidesAvailable,
};

export type DispatchProps = typeof mapDispatchToProps;

interface IRidesListDefaultProps extends IRidesListProps, DispatchProps {
	selectedGroupId: string;
}

const RidesListDefault = (props: IRidesListDefaultProps) => {
	const [selectedDate, setSelectedDate] = useState<Date>(null);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		props.getRidesAvailable(props.selectedGroupId, date);
	};

	const cssClasses = {
		list: "ridesList",
		day: "day",
		dayLabel: "day__label",
		inputs: "ridesList__inputs",
		datePicker: "ridesList__datePicker",
	};

	const resources = {
		date: "rides.date",
		invalidDate: "rides.invalidDate",
		clear: "common.label.clear",
		ok: "common.label.ok",
		cancel: "common.label.cancel",
	};

	const { t } = props;
	const [searchKey, setSearchKey] = useState(null);

	const renderJoinItem = (color: string, ride: IRide) => {
		if (props.rideSelected && props.rideSelected.rideId === ride.rideId) {
			return (
				<React.Fragment key={ride.rideId}>
					<ActiveItemJoin
						joinRideCallback={(ride, location) => props.joinRideCallback(ride, location, selectedDate)}
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
	};

	const renderDefaultItem = (color: string, ride: IRide) => {
		if (props.rideSelected && props.rideSelected.rideId === ride.rideId) {
			return (
				<React.Fragment key={ride.rideId}>
					<ActiveItemDefault
						ride={ride}
						color={color}
						t={t}
						setRide={props.setRide}
						joinRideCallback={props.joinRideCallback}
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
	};

	const renderItem = (color: string, ride: IRide) => {
		let item: JSX.Element = null;
		switch (props.listType) {
			case RidesListType.Join: {
				item = renderJoinItem(color, ride);
				break;
			}
			case RidesListType.Default: {
				item = renderDefaultItem(color, ride);
				break;
			}
			default:
				break;
		}
		return item;
	};

	const renderItems = () => {
		if (props.rides) {
			let colorIndex: number = 0;
			let rides: IRide[] = [...props.rides];
			if (searchKey) {
				rides = rides.filter(ride => ride.group.name.includes(searchKey));
			}
			return rides.map((ride) => {
				++colorIndex;
				const color = colorList[colorIndex % colorList.length];
				return renderItem(color, ride);
			});
		} else {
			return null;
		}
	};

	return (
		<ul className={cssClasses.list}>
			<div className={cssClasses.inputs}>
				<SearchBar
					keyword={searchKey}
					setKeyword={(nv) => {
						setSearchKey(nv);
					}}
				/>
				{props.listType === RidesListType.Join ? <MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						className={cssClasses.datePicker}
						disableToolbar={true}
						variant="dialog"
						format="dd/MM/yyyy"
						margin="dense"
						id="date-picker-inlie"
						label={t(resources.date)}
						value={selectedDate}
						onChange={(date: Date) => {
							handleDateChange(date);
						}}
						invalidDateMessage={t(resources.invalidDate)}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
						cancelLabel={t(resources.cancel)}
						okLabel={t(resources.ok)}
						clearable={true}
						clearLabel={t(resources.clear)}
					/>
				</MuiPickersUtilsProvider> : null}
			</div>
			{renderItems()}
		</ul>
	);
};

export default connect(null, mapDispatchToProps)(
	withTranslation()(RidesListDefault)
);

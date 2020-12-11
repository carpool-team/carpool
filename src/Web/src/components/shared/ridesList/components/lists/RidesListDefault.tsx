import React, { useState} from "react";
import { colorList } from "../../../../../scss/colorList";
import { withTranslation } from "react-i18next";
import { IRide } from "components/groups/interfaces/IRide";
import {IRidesListProps} from "../../interfaces/IRidesListProps";
import ActiveItemJoin from "../items/ActiveItemJoin";
import ActiveItemDefault from "../items/ActiveItemDefault";
import DefaultItem from "../items/DefaultItem";
import { RidesListType } from "../../enums/RidesListType";
import SearchBar from "../../../../ui/searchBar/SearchBar";

const RidesListDefault = (props: IRidesListProps) => {

	const cssClasses = {
		list: "ridesListContainer",
		day: "day",
		dayLabel: "day__label"
	};

	const { t } = props;
	const [searchKey, setSearchKey] = useState(null);

	const renderJoinItem = (color: string, ride: IRide) => {
			if (props.rideSelected && props.rideSelected.rideId === ride.rideId) {
				return (
					<React.Fragment key={ride.rideId}>
						<ActiveItemJoin
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
		let item: JSX.Element;
		switch(props.listType){
			case RidesListType.Join: {
				item = renderJoinItem(color, ride);
				break;
			}
			case RidesListType.Default: {
				item = renderDefaultItem(color, ride);
				break;
			}
		}
		return item;
	}

	let colorIndex: number = 0;
	const rides: IRide[] = props.rides;	
	
	return (
		<ul className={cssClasses.list}>
			<SearchBar
				keyword={searchKey}
				setKeyword={(nv) => {
					setSearchKey(nv);
				}}
			/>
			{rides && rides.map((ride) => {
				++colorIndex;
				const color = colorList[colorIndex % colorList.length];
				return (
					renderItem(color, ride)
				);
			})}
		</ul>
	);
};

	export default withTranslation()(RidesListDefault);

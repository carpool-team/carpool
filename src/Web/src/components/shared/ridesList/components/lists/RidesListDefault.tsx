import React, { useEffect, useState } from "react";
import { colorList } from "../../../../../scss/colorList";
import { withTranslation } from "react-i18next";
import { IRide } from "components/groups/interfaces/IRide";
import { IRidesListProps } from "../../interfaces/IRidesListProps";
import ActiveItemJoin from "../items/ActiveItemJoin";
import ActiveItemDefault from "../items/ActiveItemDefault";
import DefaultItem from "../items/DefaultItem";
import { RidesListType } from "../../enums/RidesListType";
import SearchBar from "../../../../ui/searchBar/SearchBar";
import { IGetRidesAvailableAction } from "../../../../groups/store/Types";
import { getRidesAvailable } from "../../../../groups/store/Actions";
import { connect } from "react-redux";
import { RideDirection } from "../../../../groups/api/addRide/AddRideRequest";
import Button from "../../../../ui/button/Button";
import { ButtonBackground } from "../../../../ui/button/enums/ButtonBackground";
import SearchRideModal from "../searchRideModal/SearchRideModal";
import { IRideFilters } from "../../../../groups/interfaces/IRideFilters";

interface IDispatchPropsType {
	getRidesAvailable: (groupId: string, filters?: IRideFilters) => IGetRidesAvailableAction;
}

const mapDispatchToProps: IDispatchPropsType = {
	getRidesAvailable,
};

export type DispatchProps = typeof mapDispatchToProps;

interface IRidesListDefaultProps extends IRidesListProps, DispatchProps {
	selectedGroupId: string;
}

const RidesListDefault = (props: IRidesListDefaultProps) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [filters, setFilters] = useState<IRideFilters>(null);

	useEffect(() => {
		props.getRidesAvailable(props.selectedGroupId, filters);
	}, [filters]);

	const cssClasses = {
		list: "ridesList",
		day: "day",
		dayLabel: "day__label",
		inputs: "ridesList__inputs",
		filterButtons: "ridesList__filterButtons",
		filterButton: "ridesList__filterButton",
	};

	const resources = {
		buttonFilter: "rides.button.filter",
		buttonClearFilters: "rides.button.clearFilters",
		searchBar: "common.label.search",
	};

	const { t } = props;
	const [searchKey, setSearchKey] = useState(null);

	const renderJoinItem = (color: string, ride: IRide) => {
		if (props.rideSelected && props.rideSelected.rideId === ride.rideId) {
			return (
				<React.Fragment key={ride.rideId}>
					<ActiveItemJoin
						joinRideCallback={(ride, location) => props.joinRideCallback(ride, location, filters)}
						ride={ride}
						color={color}
						t={t}
						setRide={props.setRide}
						filterKey={searchKey}
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
						filterKey={searchKey}
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
						filterKey={searchKey}
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
						filterKey={searchKey}
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
			return rides.map((ride) => {
				++colorIndex;
				const color = colorList[colorIndex % colorList.length];
				return renderItem(color, ride);
			});
		} else {
			return null;
		}
	};

	const renderSearchItems = () => {
		if (props.listType === RidesListType.Join) {
			return (
				<>
					<div className={cssClasses.filterButtons}>
						<Button
							background={ButtonBackground.Blue}
							onClick={() => setModalOpen(true)}
							additionalCssClass={cssClasses.filterButton}
						>
							{t(resources.buttonFilter)}
						</Button>
						<Button
							background={ButtonBackground.Gray}
							onClick={() => setFilters(null)}
							additionalCssClass={cssClasses.filterButton}
						>
							{t(resources.buttonClearFilters)}
						</Button>
					</div>
					<SearchRideModal
						open={modalOpen}
						onConfirm={newFilters => {
							setModalOpen(false);
							setFilters(newFilters);
						}}
						onCancel={() => {
							setModalOpen(false);
						}}
					/>
				</>
			);
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
					placeholder={t(resources.searchBar)}
				/>
				{renderSearchItems()}
			</div>
			{renderItems()}
		</ul>
	);
};

export default connect(null, mapDispatchToProps)(
	withTranslation()(RidesListDefault)
);

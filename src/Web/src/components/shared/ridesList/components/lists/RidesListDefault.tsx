import React, { useEffect, useState } from "react";
import { colorList } from "../../../../../scss/colorList";
import { withTranslation } from "react-i18next";
import { IRidesListProps } from "../../interfaces/IRidesListProps";
import ActiveItemJoin from "../items/ActiveItemJoin";
import ActiveItemDefault from "../items/ActiveItemDefault";
import DefaultItem from "../items/DefaultItem";
import { RidesListType } from "../../enums/RidesListType";
import SearchBar from "../../../../ui/searchBar/SearchBar";
import { IGetRidesAvailableAction } from "../../../../groups/store/Types";
import { getRidesAvailable } from "../../../../groups/store/Actions";
import { connect } from "react-redux";
import Button from "../../../../ui/button/Button";
import { ButtonBackground } from "../../../../ui/button/enums/ButtonBackground";
import SearchRideModal from "../searchRideModal/SearchRideModal";
import { IRideFilters } from "../../../../groups/interfaces/IRideFilters";
import { IRideExtended } from "../../../../groups/interfaces/IRideExtended";
import { sortRides } from "../../../../../helpers/RidesHelper";
import { useImmer } from "use-immer";

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

interface IRidesListDefaultState {
	modalOpen: boolean;
	filters: IRideFilters;
	rides: IRideExtended[];
	rideSelected: IRideExtended;
	useExtensions: boolean;
}

const RidesListDefault = (props: IRidesListDefaultProps) => {
	const [state, setState] = useImmer<IRidesListDefaultState>({
		modalOpen: false,
		filters: null,
		rides: null,
		rideSelected: null,
		useExtensions: false,
	});

	useEffect(() => {
		props.getRidesAvailable(props.selectedGroupId, state.filters);
	}, [state.filters]);

	useEffect(() => {
		if (props.rides) {
			if (state.filters?.location) {
				setState(draft => {
					draft.rides = sortRides(props.rides, state.filters.location, (a, b) => a.extension - b.extension);
				});
			} else {
				setState(draft => {
					draft.rides = props.rides.map(r => ({ ...r, extension: -1 }));
				});
			}
		}
	}, [props.rides]);

	useEffect(() => {
		if (props.rideSelected) {
			setState(draft => {
				draft.rideSelected = {
					...props.rideSelected,
					extension: draft.rides.find(r => r.rideId === props.rideSelected.rideId)?.extension ?? -1,
				};
			});
		}
	}, [props.rideSelected]);

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

	const renderJoinItem = (color: string, ride: IRideExtended) => {
		if (state.rideSelected?.rideId === ride.rideId) {
			return (
				<React.Fragment key={ride.rideId}>
					<ActiveItemJoin
						joinRideCallback={(ride, location) => props.joinRideCallback(ride, location, state.filters)}
						ride={ride}
						color={color}
						t={t}
						setRide={props.setRide}
						filterKey={searchKey}
						rideExtension={ride.extension > -1 ? ride.extension : null}
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
						rideExtension={ride.extension > -1 ? ride.extension : null}
					/>
				</React.Fragment>
			);
		}
	};

	const renderDefaultItem = (color: string, ride: IRideExtended) => {
		if (state.rideSelected?.rideId === ride.rideId) {
			return (
				<React.Fragment key={ride.rideId}>
					<ActiveItemDefault
						ride={ride}
						color={color}
						t={t}
						setRide={props.setRide}
						joinRideCallback={props.joinRideCallback}
						filterKey={searchKey}
						rideExtension={ride.extension > -1 ? ride.extension : null}
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
						rideExtension={ride.extension > -1 ? ride.extension : null}
					/>
				</React.Fragment>
			);
		}
	};

	const renderItem = (color: string, ride: IRideExtended) => {
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
		if (state.rides) {
			let colorIndex: number = 0;
			return state.rides.map((r) => {
				++colorIndex;
				const color = colorList[colorIndex % colorList.length];
				return renderItem(color, r);
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
							onClick={() => setState(draft => { draft.modalOpen = true; })}
							additionalCssClass={cssClasses.filterButton}
						>
							{t(resources.buttonFilter)}
						</Button>
						<Button
							background={ButtonBackground.Gray}
							onClick={() => setState(draft => { draft.filters = null; })}
							additionalCssClass={cssClasses.filterButton}
						>
							{t(resources.buttonClearFilters)}
						</Button>
					</div>
					<SearchRideModal
						open={state.modalOpen}
						onConfirm={newFilters => setState(draft => {
							draft.filters = newFilters;
							draft.modalOpen = false;
						})}
						onCancel={() => setState(draft => { draft.modalOpen = false; })}
						containerRef={document.querySelector("main")}
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

import React from "react";
import { withTranslation } from "react-i18next";
import RidesListDefault from "./components/lists/RidesListDefault";
import RidesListSchedule from "./components/lists/RidesListSchedule";
import {IRidesListProps} from "./interfaces/IRidesListProps";
import {RidesListType} from "./enums/RidesListType";
import "./RidesList.scss"

const RidesList = (props: IRidesListProps) => {

		const renderOwnerList = () => (
			<RidesListSchedule listType={props.listType} rideSelected={props.rideSelected} rides={props.rides} firstDay={props.firstDay} lastDay={props.lastDay} setRide={props.setRide} />
		);
		const renderParticipantList = () => (
			<RidesListSchedule listType={props.listType} rideSelected={props.rideSelected} rides={props.rides} firstDay={props.firstDay} lastDay={props.lastDay} setRide={props.setRide} />
		);
		const renderDefaultList = () => (
			<RidesListDefault listType={props.listType} rideSelected={props.rideSelected} rides={props.rides}  setRide={props.setRide} />
		);
		const renderJoinList = () => (
			<RidesListDefault listType={props.listType} rideSelected={props.rideSelected} rides={props.rides} setRide={props.setRide} />
		);

		const renderList = () =>{
			let list: JSX.Element;
			switch(props.listType){
				case RidesListType.Owner: {
					list = renderOwnerList();
					break;
				}
				case RidesListType.Participant: {
					list = renderParticipantList();
					break;
				}
				case RidesListType.Join: {
					list = renderJoinList();
					break;
				}
				case RidesListType.Default: {
					list = renderDefaultList();
					break;
				}
				default: {
					list = renderDefaultList();
					break;
				}
			}
			return list;
		}

	return (
		renderList()
	);
};

export default withTranslation()(RidesList);

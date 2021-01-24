import React from "react";
import { withTranslation } from "react-i18next";
import RidesListDefault from "./components/lists/RidesListDefault";
import RidesListSchedule from "./components/lists/RidesListSchedule";
import { RidesListType } from "./enums/RidesListType";
import RequestsListDefault from "./components/lists/RequestsListDefault";
import { IListProps } from "./interfaces/IListProps";
import "./RidesList.scss";

const RidesList = (props: IListProps) => {
	const renderOwnerList = () => (
		<RidesListSchedule
			listType={props.listType}
			rideSelected={props.rideSelected}
			rides={props.rides}
			firstDay={props.firstDay}
			lastDay={props.lastDay}
			setRide={props.setRide}
		/>
	);

	const renderParticipantList = () => (
		<RidesListSchedule
			listType={props.listType}
			rideSelected={props.rideSelected}
			rides={props.rides}
			firstDay={props.firstDay}
			lastDay={props.lastDay}
			setRide={props.setRide}
		/>
	);

	const renderDefaultList = () => (
		<RidesListDefault
			listType={props.listType}
			rideSelected={props.rideSelected}
			rides={props.rides}
			setRide={props.setRide}
			joinRideCallback={props.joinRideCallback}
			selectedGroupId={props.selectedGroupId}
		/>
	);

	const renderJoinList = () => (
		<RidesListDefault
			listType={props.listType}
			rideSelected={props.rideSelected}
			rides={props.rides}
			setRide={props.setRide}
			joinRideCallback={props.joinRideCallback}
			selectedGroupId={props.selectedGroupId}
		/>
	);

	const renderRequestParticipantList = () => (
		<RequestsListDefault
			answerCallback={props.answerRequestCallback} listType={props.listType}
			requestSelected={props.requestSelected} requests={props.requests} setRequest={props.setRequest}
		/>
	);

	const renderRequestOwnerList = () => (
		<RequestsListDefault
			answerCallback={props.answerRequestCallback} listType={props.listType}
			requestSelected={props.requestSelected} requests={props.requests} setRequest={props.setRequest}
		/>
	);

	const renderList = () => {
		let list: JSX.Element;
		switch (props.listType) {
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
			case RidesListType.RequestOwner: {
				list = renderRequestOwnerList();
				break;
			}
			case RidesListType.RequestParticipant: {
				list = renderRequestParticipantList();
				break;
			}
			default: {
				list = renderDefaultList();
				break;
			}
		}
		return list;
	};

	return (
		renderList()
	);
};

export default withTranslation()(RidesList);

import React, { useState } from "react";
import { colorList } from "../../../../../scss/colorList";
import { withTranslation } from "react-i18next";
import { IRequestsListProps } from "../../interfaces/IRequestsListProps";
import { RidesListType } from "../../enums/RidesListType";
import { IRideRequest } from "../../../../groups/interfaces/IRideRequest";
import DefaultItemRequestParticipant from "../items/DefaultItemRequestParticipant";
import DefaultItemRequestOwner from "../items/DefaultItemRequestOwner";

const RequestsListDefault = (props: IRequestsListProps) => {

	const cssClasses = {
		list: "ridesList",
	};

	const { t } = props;

	const renderRequestOwnerItem = (color: string, request: IRideRequest) => {
		if (props.requestSelected && props.requestSelected.rideRequestId === request.rideRequestId) {
			return (
				<React.Fragment key={request.rideRequestId}>
					{/* <ActiveItemRequestOwner
						request={request}
						color={color}
						t={t}
						setRide={props.setRequest}
					/> */}
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment key={request.rideRequestId}>
					<DefaultItemRequestOwner
						request={request}
						color={color}
						t={t}
						setRequest={props.setRequest}
					/>
				</React.Fragment>
			);
		}
	};

	const renderRequestParticipantItem = (color: string, request: IRideRequest) => {
		if (props.requestSelected && props.requestSelected.rideRequestId === request.rideRequestId) {
			return (
				<React.Fragment key={request.rideRequestId}>
					{/* <ActiveItemRequestParticipant
						request={request}
						color={color}
						t={t}
						setRequest={props.setRequest}
					/> */}
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment key={request.rideRequestId}>
					<DefaultItemRequestParticipant
						request={request}
						color={color}
						t={t}
						setRequest={props.setRequest}
					/>
				</React.Fragment>
			);
		}
	};

	const renderItem = (color: string, request: IRideRequest) => {
		let item: JSX.Element;
		switch (props.listType) {
			case RidesListType.RequestParticipant: {
				item = renderRequestParticipantItem(color, request);
				break;
			}
			case RidesListType.Default: {
				item = renderRequestOwnerItem(color, request);
				break;
			}
		}
		return item;
	}

	let colorIndex: number = 0;
	const rides: IRideRequest[] = props.requests;

	return (
		<ul className={cssClasses.list}>
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

export default withTranslation()(RequestsListDefault);

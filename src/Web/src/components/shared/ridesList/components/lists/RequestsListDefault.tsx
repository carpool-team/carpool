import React, { useState } from "react";
import { colorList } from "../../../../../scss/colorList";
import { withTranslation } from "react-i18next";
import { IRequestsListProps } from "../../interfaces/IRequestsListProps";
import { RidesListType } from "../../enums/RidesListType";
import { IRideRequest } from "../../../../groups/interfaces/rideRequest/IRideRequest";
import DefaultItemRequestParticipant from "../items/DefaultItemRequestParticipant";
import DefaultItemRequestOwner from "../items/DefaultItemRequestOwner";
import ActiveItemRequestParticipant from "../items/ActiveItemRequestParticipant";
import ActiveItemRequestOwner from "../items/ActiveItemRequestOwner";
import { LoadingStatus } from "../../../enum/LoadingStatus";
import LoaderBlock from "../../../../ui/loaderBlock/LoaderBlock";
import LabelBlock from "../../../../ui/labelBlock/LabelBlock";

const RequestsListDefault = (props: IRequestsListProps) => {

	const cssClasses = {
		list: "ridesList",
	};

	const resources = {
		getError: "requestsList.getErrorLabel",
		noRequests: "requestsList.noRequestsLabel",
	};

	const { t } = props;

	const renderRequestOwnerItem = (color: string, request: IRideRequest) => {
		if (props.requestSelected && props.requestSelected.rideRequestId === request.rideRequestId) {
			if (!props.answerCallback) {
				throw "Answer callback for request not supplied!";
			}
			return (
				<React.Fragment key={request.rideRequestId}>
					<ActiveItemRequestOwner
						request={request}
						color={color}
						t={t}
						setRequest={props.setRequest}
						answerCallback={props.answerCallback}
					/>
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
					<ActiveItemRequestParticipant
						request={request}
						color={color}
						t={t}
						setRequest={props.setRequest}
					/>
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
			case RidesListType.RequestOwner: {
				item = renderRequestOwnerItem(color, request);
				break;
			}
			default:
				throw "Unexpected list type";
		}
		return item;
	};

	let colorIndex: number = 0;
	const reqs: IRideRequest[] = props.requests;

	const renderItems = () => {
		switch (props.loadingStatus) {
			case LoadingStatus.Loading:
				return <LoaderBlock />;
			case LoadingStatus.Error:
				return <LabelBlock text={t(resources.getError)} />;
			case LoadingStatus.Success:
			default:
				if (reqs && reqs.length > 0) {
					return reqs.map((req) => {
						++colorIndex;
						const color = colorList[colorIndex % colorList.length];
						return (
							renderItem(color, req)
						);
					});
				} else {
					return <LabelBlock text={t(resources.noRequests)} />;
				}
		}
	};

	return (
		<ul className={cssClasses.list}>
			{renderItems()}
		</ul>
	);
};

export default withTranslation()(RequestsListDefault);

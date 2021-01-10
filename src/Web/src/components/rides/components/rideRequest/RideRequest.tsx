import React, { useEffect, useState } from "react";
import { IRide } from "../../../groups/interfaces/IRide";
import MediaQuery from "react-responsive";
import MapBoxRides from "../../../map/MapBoxRides";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RidesList from "../../../shared/ridesList/RidesList";
import { RidesListType } from "../../../shared/ridesList/enums/RidesListType";
import { IRideRequest } from "../../../groups/interfaces/rideRequest/IRideRequest";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, StateProps, DispatchProps } from "../../store/PropsTypes";

interface IRideRequestProps extends RouteComponentProps, IReactI18nProps, StateProps, DispatchProps {

}

const RideRequest = (props: IRideRequestProps) => {

	const cssClasses = {
		container: "rides--container",
		leftPanel: "rides--leftPanel",
		rightPanel: "rides--rightPanel",
		rightTopPanel: "rides--rightPanel__top",
		rightBottomPanel: "rides--rightPanel__bottom",
		leftLabels: "rides--leftPanel__label",
		leftList: "rides--leftPanel__list",
		leftOutline: "rides--leftPanel__outline",
		leftLabelsText: "rides--leftPanel__text",
		switchActive: "rides--leftPanel__switchActive",
		switch: "rides--leftPanel__switch",
	};

	const resources = {
		participant: "common.passenger",
		owner: "common.driver",
		label: "requests.myRequests"
	};
	const ids = {
		to: "toId",
		from: "fromId",
	};

	const { t } = props;

	const [selectedRequest, setSelectedRequest] = useState<IRideRequest>(null);
	const [userOwner, setUserOwner] = useState<boolean>(false);
	const [switchCssClass, setSwitchCssClass] = useState({ from: cssClasses.switchActive, to: null });

	useEffect(() => {
		props.getRideRequests();
		props.setLoaderVisible(true);
	}, []);

	const setRequest = (request: IRideRequest) => {
		if (request !== null) {
			setSelectedRequest(request);
		}
	};

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserOwner(event.target.checked);
		setSelectedRequest(null);
		if (event.target.checked) {
			setSwitchCssClass({ from: null, to: cssClasses.switchActive });
		} else {
			setSwitchCssClass({ from: cssClasses.switchActive, to: null });
		}
	};

	const UserSwitch = withStyles({
		switchBase: {
			color: "#6b98d1",
			"&$checked": {
				color: "#6b98d1",
			},
			"&$checked + $track": {
				backgroundColor: "#707070",
			},
			"& + $track": {
				backgroundColor: "#707070",
			}
		},
		checked: {},
		track: {},
	})(Switch);

	const answerRequestCallback: (id: string, accepted: boolean, owned: boolean) => void = (id, accepted, owned) => {
		props.setLoaderVisible(true);
		props.answerRideRequest(id, accepted, owned);
	};

	const renderOwnerList = () => (
		<RidesList
			listType={RidesListType.RequestOwner}
			requests={props.requestsOwner}
			requestSelected={selectedRequest}
			setRequest={setRequest}
			answerRequestCallback={(id, accepted) => answerRequestCallback(id, accepted, true)}
		/>
	);
	const renderParticipantList = () => (
		<RidesList
			listType={RidesListType.RequestParticipant}
			requests={props.requestsParticipant}
			requestSelected={selectedRequest}
			setRequest={setRequest}
			answerRequestCallback={(id, accepted) => answerRequestCallback(id, accepted, false)}
		/>
	);

	const renderList = () => {
		let list: JSX.Element;
		if (userOwner) {
			list = renderOwnerList();
		} else {
			list = renderParticipantList();
		}
		return list;
	};

	const getRideFromRequest: (request: IRideRequest) => IRide = request => {
		if (request) {
			return {
				rideDirection: request.ride.rideDirection,
				location: request.ride.location,
				group: {
					...request.ride.group,
					userCount: 0,
					rideCount: 0,
					code: "",
					owner: {
						...request.rideOwner,
						appUserId: request.rideOwner.id,
						vehicle: "",
					},
					users: [],
				},
				rideDate: request.ride.date,
				rideId: request.ride.id,
				price: 0,
				owner: request.rideOwner,
			};
		} else {
			return null;
		}
	};

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.leftPanel}>
				<div className={cssClasses.leftLabels}>
					<span>
						{t(resources.label)}
					</span>
				</div>
				<div className={cssClasses.switch}>
					<span className={switchCssClass.from} id={ids.from}> {t(resources.participant)}</span>
					<FormControlLabel
						control={<UserSwitch size="medium" checked={userOwner} onChange={handleSwitchChange} />}
						label=""
					/>
					<span className={switchCssClass.to} id={ids.to}> {t(resources.owner)}</span>
				</div>
				<div className={cssClasses.leftOutline}></div>
				<div className={cssClasses.leftList}>
					{renderList()}
				</div>
			</div>
			<MediaQuery query="(min-width: 900px)">
				<div className={cssClasses.rightPanel}>
					<MapBoxRides ride={getRideFromRequest(selectedRequest)} />
				</div>
			</MediaQuery>
		</div>
	);
};

export default withTranslation()(
	withRouter(
		connect(mapStateToProps, mapDispatchToProps)(RideRequest)
	)
);

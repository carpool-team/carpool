import React, { useEffect, useState } from "react";
import ButtonSmall from "../../../ui/buttonSmall/ButtonSmall";
import { ButtonSmallBackground } from "../../../ui/buttonSmall/enums/ButtonSmallBackground";
import { ButtonSmallColor } from "../../../ui/buttonSmall/enums/ButtonSmallColor";
import { ButtonSmallIcon } from "../../../ui/buttonSmall/enums/ButtonSmallIcon";
import ButtonLink from "../../../ui/buttonLink/ButtonLink";
import { ButtonLinkBackground } from "../../../ui/buttonLink/enums/ButtonLinkBackground";
import { ButtonLinkColor } from "../../../ui/buttonLink/enums/ButtonLinkColor";
import { ButtonLinkStyle } from "../../../ui/buttonLink/enums/ButtonLinkStyle";
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
import { IRideRequest } from "../../../groups/interfaces/IRideRequest";
import { exampleRidesRequest } from "../../../../examples/exampleRidesRequest";

interface IRideRequestProps extends RouteComponentProps, IReactI18nProps {

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

	const { url } = props.match;
	const { t } = props;

	const [selectedRide, setSelectedRide] = useState<IRide>(null);
	const [selectedRequest, setSelectedRequest] = useState<IRideRequest>(null);
	const [userOwner, setUserOwner] = useState<boolean>(false);
	const [switchCssClass, setSwitchCssClass] = useState({ from: cssClasses.switchActive, to: null });

	useEffect(() => {
		if (selectedRequest && selectedRequest.ride !== selectedRide) {
			setSelectedRide(selectedRequest.ride);
		}
	}, [selectedRequest]);

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

	const renderOwnerList = () => (
		<RidesList listType={RidesListType.RequestOwner} requests={/*props.requestOwned ??*/ exampleRidesRequest ?? []} requestSelected={selectedRequest} setRequest={setRequest} />
	);
	const renderParticipantList = () => (
		<RidesList listType={RidesListType.RequestParticipant} requests={ /*props.requestParticipated ?? */exampleRidesRequest ?? []} requestSelected={selectedRequest} setRequest={setRequest} />
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
					<MapBoxRides ride={selectedRide}></MapBoxRides>
				</div>
			</MediaQuery>
		</div>
	);
};

export default withTranslation()(
	withRouter(RideRequest)
);

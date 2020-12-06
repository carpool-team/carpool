import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "../ui/button/Button";
import { ButtonBackground } from "../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../ui/button/enums/ButtonColor";
import ButtonLink from "../ui/buttonLink/ButtonLink";
import { ButtonLinkBackground } from "../ui/buttonLink/enums/ButtonLinkBackground";
import { ButtonLinkColor } from "../ui/buttonLink/enums/ButtonLinkColor";
import {ButtonLinkStyle} from "../ui/buttonLink/enums/ButtonLinkStyle";
import { mainRoutes } from "../layout/components/LayoutRouter";
import ridesExample from "../../examples/exampleRides";
import { IRide } from "../../components/groups/interfaces/IRide";
import MediaQuery from "react-responsive";
import MapBoxRides from "../map/MapBoxRides";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../system/resources/IReactI18nProps";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RidesOwner from "./components/RidesOwner";
import RidesParticipant from "./components/RidesParticipant";

interface IRidesProps extends RouteComponentProps, IReactI18nProps {

}

const Rides = (props: IRidesProps) => {
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
		switch: "rides--leftPanel__switch"
	};
	const resources = {
		add: "addBtn",
		participant: "common.passenger",
		owner: "common.driver"
	};
	const ids = {
		to: "toId",
		from: "fromId"
	};

	const rides: IRide[] = ridesExample;
	const [selectedRide, setSelectedRide] = useState(null);
	const [userOwner, setUserOwner] = useState(false);
	const [switchCssClass, setSwitchCssClass] = useState({from: cssClasses.switchActive, to: null});
	const setRide = (ride: IRide) => {
		if (ride !== null) {
			setSelectedRide(ride);
		}
	};
	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserOwner(event.target.checked);
		if (event.target.checked) {
			setSwitchCssClass({from: null, to: cssClasses.switchActive});
		} else {
			setSwitchCssClass({from: cssClasses.switchActive, to: null});
		}
	};

	const renderOwnerList = () => (
		<RidesOwner rideSelected={selectedRide} setRide={setRide} rides={rides} />
	);
	const renderParticipantList = () => (
		<RidesParticipant rideSelected={selectedRide} setRide={setRide} rides={rides}/>
	);

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

	const renderList = () => {

		let list: JSX.Element;
		if (userOwner) {
			list = renderOwnerList();
		}	else {
			list = renderParticipantList();
		}
		return list;
	};

	const { url } = props.match;
	const { t } = props;

	return (
		<div className = {cssClasses.container}>
			<div className={cssClasses.leftPanel}>
				<div className={cssClasses.leftLabels}>
					<span> {t("Moje przejazdy")} </span>
					<ButtonLink
						style={ButtonLinkStyle.Button}
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
						// to={`${url}${GroupsRouter.routes.addGroup}`}
					>
						{t(resources.add)}
					</ButtonLink>
				</div>
				<div className={cssClasses.switch}>
					<span className={switchCssClass.from} id={ids.from}> {t(resources.participant)}</span>
						<FormControlLabel
							control={<UserSwitch size="medium" checked={userOwner} onChange={handleSwitchChange} />}
							label=""
						/>
					<span className={switchCssClass.to} id={ids.to}> {t(resources.owner) }</span>
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

export default withTranslation()(withRouter(Rides));

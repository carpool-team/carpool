import React, { useEffect, useState } from "react";
import ButtonSmall from "../../ui/buttonSmall/ButtonSmall";
import { ButtonSmallBackground } from "../../ui/buttonSmall/enums/ButtonSmallBackground";
import { ButtonSmallColor } from "../../ui/buttonSmall/enums/ButtonSmallColor";
import { ButtonSmallIcon } from "../../ui/buttonSmall/enums/ButtonSmallIcon";
import ButtonLink from "../../ui/buttonLink/ButtonLink";
import { ButtonLinkBackground } from "../../ui/buttonLink/enums/ButtonLinkBackground";
import { ButtonLinkColor } from "../../ui/buttonLink/enums/ButtonLinkColor";
import { ButtonLinkStyle } from "../../ui/buttonLink/enums/ButtonLinkStyle";
import { IRide } from "../../groups/interfaces/IRide";
import MediaQuery from "react-responsive";
import MapBoxRides from "../../map/MapBoxRides";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import moment from "moment";
import { connect } from "react-redux";
import { IGroupsState } from "../../groups/store/State";
import { IGetRidesAction } from "../../groups/store/Types";
import { getRides } from "../../groups/store/Actions";
import Button from "../../ui/button/Button";
import { ButtonColor } from "../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../ui/button/enums/ButtonBackground";
import { ButtonIcon } from "../../ui/button/enums/ButtonIcon";
import RidesList from "../../shared/ridesList/RidesList";
import { RidesListType } from "../../shared/ridesList/enums/RidesListType";
import { rideRoutes } from "../RidesRouter";


interface IRideRequestProps extends RouteComponentProps, IReactI18nProps {

}

const RideRequest = (props: IRideRequestProps) => {

	const cssClasses = {

	};

	const resources = {
		add: "rides.addRide",
		participant: "common.passenger",
		owner: "common.driver",
		pastBtn: "rides.pastBtn",
		futureBtn: "rides.futureBtn",
		label: "rides.myRides"
	};
	const ids = {

	};

	const { url } = props.match;
	const { t } = props;

	return (
		<div>chuj</div>
	);
};

export default withTranslation()(
	withRouter((RideRequest)
	)
);

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
import "./Rides.scss";
import { connect } from "react-redux";
import { IGroupsState } from "../../groups/store/State";
import { IGetRidesAction } from "../../groups/store/Types";
import { getRides } from "../../groups/store/Actions";
import Button from "../../ui/button/Button";
import { ButtonColor } from "../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../ui/button/enums/ButtonBackground";
import { ButtonIcon } from "../../ui/button/enums/ButtonIcon";
import RidesList from "../../shared/ridesList/RidesList";
import {RidesListType} from "../../shared/ridesList/enums/RidesListType";
import { rideRoutes } from "../RidesRouter";

interface IStatePropsType {
	groups: IGroupsState;
}

interface IStateToProps {
	ridesOwned: IRide[];
	ridesParticipated: IRide[];
	ridesPastOwner: IRide[];
	ridesPastParticipated: IRide[];
}
enum Lists {
	Future = "FUTURE",
	Past = "PAST",
}

const mapStateToProps = (state: IStatePropsType): IStateToProps => ({
	ridesOwned: state.groups.ridesOwned,
	ridesParticipated: state.groups.ridesParticipated,
	ridesPastParticipated : state.groups.ridesParticipatedPast,
	ridesPastOwner : state.groups.ridesOwnedPast
});

interface IDispatchPropsType {
	getRides: () => IGetRidesAction;
}

const mapDispatchToProps: IDispatchPropsType = {
	getRides,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface IRidesProps extends RouteComponentProps, IReactI18nProps, StateProps, DispatchProps {

}

const Rides = (props: IRidesProps) => {
	useEffect(() => {
		props.getRides();
	}, []);

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
		dateBar: "dateBar",
		dateBarRange: "dateBar__range",
		dateBarArrow: "dateBar__arrow",
		buttonActive: "groupsManagementButtonActive",
		buttonDisable: "buttonDisable"
	};

	const resources = {
		add: "addBtn",
		participant: "common.passenger",
		owner: "common.driver",
		pastBtn: "rides.pastBtn",
		futureBtn: "rides.futureBtn"
	};
	const ids = {
		to: "toId",
		from: "fromId",
		past: "pastId",
		future: "futureId"
	};

	const [selectedRide, setSelectedRide] = useState(null);
	const [userOwner, setUserOwner] = useState(false);
	const [switchCssClass, setSwitchCssClass] = useState({ from: cssClasses.switchActive, to: null });
	const [activeList, setActiveList] = useState(Lists.Future);
	const [buttonCssClass, setButtonCssClass] = useState({ future: cssClasses.buttonActive, past: null });
	const [buttonDisable, setButtonDisable] = useState(cssClasses.buttonDisable);

	const setRide = (ride: IRide) => {
		if (ride !== null) {
			setSelectedRide(ride);
		}
	};

	const	setCurrentList = (list: Lists) => {
		if (list !== activeList) {
			if (list === Lists.Future) {
				setButtonCssClass({future: cssClasses.buttonActive, past: null});
				setActiveList(Lists.Future);
				setSelectedRide(null);
			} else {
				setButtonCssClass({future: null, past: cssClasses.buttonActive});
				setActiveList(Lists.Past);
				setSelectedRide(null);
			}
		}
	};

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserOwner(event.target.checked);
		setSelectedRide(null);
		if (event.target.checked) {
			setSwitchCssClass({ from: null, to: cssClasses.switchActive });
		} else {
			setSwitchCssClass({ from: cssClasses.switchActive, to: null });
		}
	};

	const getWeek = (offset: number) => {
		const start = moment()
			.add(offset, "weeks")
			.startOf("isoWeek");
		const end = moment()
			.add(offset, "weeks")
			.endOf("isoWeek");
		const current = start.clone();
		const week = [];

		while (current.isBefore(end)) {
			week.push(current.format("YYYY-MM-DD"));
			current.add(1, "day");
		}

		return week;
	};
	const getDates = (offset: number) => {
		const week = getWeek(offset);
		const range = `${moment(week[0]).format("DD.MM")} - ${moment(week[6]).format(
			"DD.MM",
		)}`;

		const firstDay = moment(week[0]).format();
		const lastDay = moment(week[6]).format();
		return {
			firstDay,
			lastDay,
			range,
			week,
		};
	};
	const [dateOffset, setDateOffset] = useState(0);
	const [date, setDate] = useState(getDates(0));

	const onNextDate = () => {
		const newOffset = dateOffset + 1;
		setDate(getDates(newOffset));
		setDateOffset(newOffset);
		setSelectedRide(null);
		setButtonDisable(null);
	};
	const onPrevDate = () => {
		const newOffset = dateOffset - 1;
		setDate(getDates(newOffset));
		setDateOffset(newOffset);
		setSelectedRide(null);
		if (newOffset === 0) {
			setButtonDisable(cssClasses.buttonDisable);
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
		<RidesList listType={RidesListType.Owner} rides={props.ridesOwned ?? []} rideSelected={selectedRide} firstDay={date.firstDay} lastDay={date.lastDay} setRide={setRide} />
	);
	const renderParticipantList = () => (
		<RidesList listType={RidesListType.Participant} rides={props.ridesParticipated ?? []} rideSelected={selectedRide} firstDay={date.firstDay} lastDay={date.lastDay} setRide={setRide} />
	);
	const renderPastParticipantList = () => (
		<RidesList listType={RidesListType.Default} rides={props.ridesPastParticipated ?? []} rideSelected={selectedRide} setRide={setRide} />
	);
	const renderPastOwnerList = () => (
		<RidesList listType={RidesListType.Default} rides={props.ridesPastOwner ?? []} rideSelected={selectedRide} setRide={setRide} />
	);

	const renderList = () => {

		let list: JSX.Element;
		if (userOwner) {
			if (activeList === Lists.Future) {
				list = renderOwnerList();
			} else {
				list = renderPastOwnerList();
			}
		} else {
			if (activeList === Lists.Future) {
				list = renderParticipantList();
			} else {
				list = renderPastParticipantList();
			}
		}
		return list;
	};

	const { url } = props.match;
	const { t } = props;

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.leftPanel}>
				<div className={cssClasses.leftLabels}>
					<Button id={ids.past} background={ButtonBackground.White}  color={ButtonColor.Gray} className={buttonCssClass.past} onClick={() => setCurrentList(Lists.Past)}>
						{t(resources.pastBtn)}
					</Button>
					<Button id={ids.future} background={ButtonBackground.White} className={buttonCssClass.future} color={ButtonColor.Gray} onClick={() => setCurrentList(Lists.Future)}>
						{t(resources.futureBtn)}
					</Button>
					<ButtonLink
						style={ButtonLinkStyle.Button}
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
					  to={`${url}${rideRoutes.addRide}`}
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
					<span className={switchCssClass.to} id={ids.to}> {t(resources.owner)}</span>
				</div>
				{activeList === Lists.Future &&
				<div className={cssClasses.dateBar}>
					<div>
						<ButtonSmall
							className={[cssClasses.dateBarArrow, buttonDisable].join(" ")}
							color={ButtonSmallColor.Gray}
							background={ButtonSmallBackground.White}
							icon={ButtonSmallIcon.Left}
							onClick={() => onPrevDate()}
						/>
					</div>
					<div className={cssClasses.dateBarRange}>{date.range}</div>
					<div >
						<ButtonSmall
							className={cssClasses.dateBarArrow}
							color={ButtonSmallColor.Gray}
							background={ButtonSmallBackground.White}
							icon={ButtonSmallIcon.Right}
							onClick={() => onNextDate()}
						/>
					</div>
				</div>
				}
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
	withRouter(
		connect(mapStateToProps, mapDispatchToProps)(Rides)
	)
);

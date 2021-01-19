import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { IGroup } from "../../../interfaces/IGroup";
import React, { useEffect, useState } from "react";
import exampleReport from "../../../../../examples/exampleReport";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import RankingList from "./RankingList";
import { IClearReportAction, IGetReportAction } from "../../../store/Types";
import { clearReport, getReport } from "../../../store/Actions";
import { connect } from "react-redux";
import { IReport } from "../../../interfaces/IReport";
import { IGroupsState } from "../../../store/State";
import { render } from "react-dom";
import LoaderSplash from "../../../../ui/loaderSplash/LoaderSplash";
import LoaderSpinner from "../../../../ui/loaderSpinner/LoaderSpinner";

interface IDispatchPropsType {
	getReport: (id: string) => IGetReportAction;
	clearReport: () => IClearReportAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	getReport,
	clearReport,
};

interface IStatePropsType {
	groups: IGroupsState;
}

interface IStateFromProps {
	report: IReport;
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	report: state.groups.report,
});

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

interface IReportGroupForm extends IReactI18nProps, DispatchProps, StateProps {
	group: IGroup;
}

const ReportGroupForm: (props: IReportGroupForm) => JSX.Element = props => {
	useEffect(() => {
		props.getReport(props.group.groupId);
		return () => {
			props.clearReport();
		};
	}, []);

	const { t } = props;

	const cssClasses = {
		container: "report",
		leftPanel: "report__left",
		rightPanel: "report__right",
		rightPanelItem: "report__rightItem",
		label: "report__left--label",
		datePicker: "ridesAddRideForm__datePicker",
		groupSum: "report__left--groupSum",
		tree: "report__left--tree"
	};
	const resources = {
		reportLabel: "groups.report.label",
		toDate: "groups.report.toDate",
		fromDate: "groups.report.fromDate",
		driversLabel: "groups.report.driversLabel",
		passengersLabel: "groups.report.passengersLabel",
		groupSum: "groups.report.sumText",
		groupSum2: "groups.report.sumText2",
		groupSum3: "groups.report.sumText3",
		groupSum4: "groups.report.sumText4",
		groupSum5: "groups.report.sumText5"
	};

	const [selectedFromDate, setSelectedFromDate] = useState(new Date(moment().subtract("months", 1).toISOString()));
	const [selectedToDate, setSelectedToDate] = useState(new Date());

	const handleToDateChange = (date: Date) => {
		setSelectedToDate(date);
	};

	const handleFromDateChange = (date: Date) => {
		setSelectedFromDate(date);
	};

	const calculateTrees = () => {
		console.log(props.report.passengerCount)
		if (props.report.passengerCount === 0) {
			return 0
		} else {
			return Math.ceil(props.report.passengerCount / 6);
		}
	};

	const renderReport = () => (
		<div className={cssClasses.container}>
			<div className={cssClasses.leftPanel}>
				<div className={cssClasses.label}>
					{t(resources.reportLabel)}
					<span>{props.group.name}</span>
				</div>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						className={cssClasses.datePicker}
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="dense"
						id="date-picker-inlie1"
						label={t(resources.fromDate)}
						value={selectedFromDate}
						onChange={(date: Date) => {
							handleFromDateChange(date);
						}}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
					<KeyboardDatePicker
						className={cssClasses.datePicker}
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="dense"
						id="date-picker-inlie2"
						label={t(resources.toDate)}
						value={selectedToDate}
						onChange={(date: Date) => {
							handleToDateChange(date);
						}}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
				</MuiPickersUtilsProvider>
				<div className={cssClasses.groupSum}>
					{t(resources.groupSum)}
					{t(resources.groupSum2)}
					<span>{props.report.ridesCount}</span>
					{t(resources.groupSum3)}
					<span>{props.report.passengerCount}</span>
					{t(resources.groupSum4)}
					<span>{calculateTrees()}</span>
					{t(resources.groupSum5)}
				</div>
				<div className={cssClasses.tree}>

				</div>
			</div>
			<div className={cssClasses.rightPanel}>
				<span className={cssClasses.rightPanelItem}>{t(resources.driversLabel)}</span>
				<RankingList users={props.report.drivers} />
				<span className={cssClasses.rightPanelItem}>{t(resources.passengersLabel)}</span>
				<RankingList users={props.report.passengers} />
			</div>

		</div>
	);

	if (props.report === null) {
		return <LoaderSpinner></LoaderSpinner>;
	} else {
		return renderReport();
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(
	withTranslation()(ReportGroupForm)
);

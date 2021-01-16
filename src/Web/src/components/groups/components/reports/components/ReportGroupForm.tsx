import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { IGroup } from "../../../interfaces/IGroup";
import React, { useState } from "react";
import exampleReport from "../../../../../examples/exampleReport";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import RankingList from "./RankingList";

interface IReportGroupForm extends IReactI18nProps {
	group: IGroup
}

const ReportGroupForm: (props: IReportGroupForm) => JSX.Element = props => {
	const { t } = props;

	const reportData = exampleReport;

	const cssClasses = {
		container: "report",
		leftPanel: "report__left",
		rightPanel: "report__right",
		label: "report__left--label",
		datePicker: "ridesAddRideForm__datePicker",
		groupSum: "report__left--groupSum",
		tree: "report__left--tree"
	}
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
	}

	const [selectedFromDate, setSelectedFromDate] = useState(new Date(moment().subtract('months', 1).toISOString()));
	const [selectedToDate, setSelectedToDate] = useState(new Date());

	const handleToDateChange = (date: Date) => {
		setSelectedToDate(date)
	}

	const handleFromDateChange = (date: Date) => {
		setSelectedFromDate(date)
	}

	const calculateTrees = () => {
		return Math.ceil(reportData.passengersInGroup / 6)
	}

	return (
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
						id="date-picker-inlie"
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
						id="date-picker-inlie"
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
					<span>{reportData.ridesInGroup}</span>
					{t(resources.groupSum3)}
					<span>{reportData.passengersInGroup}</span>
					{t(resources.groupSum4)}
					<span>{calculateTrees()}</span>
					{t(resources.groupSum5)}
				</div>
				<div className={cssClasses.tree}>

				</div>
			</div>
			<div className={cssClasses.rightPanel}>
				<span>{t(resources.driversLabel)}</span>
				{RankingList(reportData.drivers)}
				<span>{t(resources.passengersLabel)}</span>
				{RankingList(reportData.passengers)}
			</div>

		</div>
	);
}
export default withTranslation()(ReportGroupForm)

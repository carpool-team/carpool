import React from "react";
import GroupDetailedView, {
	IGroupDetailedViewProps,
} from "../detailedView/GroupDetailedView";
import ReportGroupForm from "./components/ReportGroupForm";

interface IGroupReportProps extends IGroupDetailedViewProps { }

const GroupReport = (props: IGroupReportProps) => {
	return (
		<GroupDetailedView group={props.group} rides={props.rides}>
			<ReportGroupForm
				group={props.group}
			/>
		</GroupDetailedView>
	);
};

export default GroupReport;

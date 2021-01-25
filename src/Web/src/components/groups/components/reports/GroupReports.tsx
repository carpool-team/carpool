import React from "react";
import GroupDetailedView, {
	IGroupDetailedViewProps,
} from "../detailedView/GroupDetailedView";
import ReportGroupForm from "./components/ReportGroupForm";

interface IGroupReportProps extends IGroupDetailedViewProps { }

const GroupReport = (props: IGroupReportProps) => {
	return (
		<GroupDetailedView group={props.group} rides={props.rides} loadingStatus={props.loadingStatus}>
			<ReportGroupForm
				group={props.group}
				loadingStatus={props.loadingStatus}
			/>
		</GroupDetailedView>
	);
};

export default GroupReport;

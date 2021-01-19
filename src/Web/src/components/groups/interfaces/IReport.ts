import { IReportGroup } from "./IReportGroup";
import { IReportUser } from "./IReportUser";

/** Report interface */
export interface IReport {
	drivers: IReportUser[];
	passengers: IReportUser[];
	group: IReportGroup;
	ridesCount: number;
	passengersCount: number;
}

import { IReportUser } from "./IReportUser";

/** Report interface */
export interface IReport {
	drivers: IReportUser[]
	passengers: IReportUser[]
	ridesInGroup: number
	passengersInGroup: number
}

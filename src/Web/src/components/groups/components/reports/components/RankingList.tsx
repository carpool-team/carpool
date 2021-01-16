import { IReportUser } from "../../../interfaces/IReportUser"
import React from "react";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { colorList } from "../../../../../scss/colorList";

const RankingList: (props: IReportUser[]) => JSX.Element = props => {

	const rankingData = props ?? []
	rankingData.sort((a, b) => (a.rideCount < b.rideCount) ? 1 : -1)
	const maxRides = props[0].rideCount ?? 0

	const cssClasses = {
		rankingContainer: "report__right--ranking",
		rankingItem: "report__right--ranking--item",
		position: "report__right--ranking--postion",
		bar: "report__right--ranking--bar",
		ridesNumber: "report__right--ranking--ridesNumber",
	}
	const calculateWidth = (ridesNumer: number, idx: number) => {
		let style: CSSProperties = {
			width: (ridesNumer / maxRides * 70).toString() + "%",
			backgroundColor: "#efeeee80"
		}
		if (idx === 0) {
			style.background = "#1cca9b"
		}
		if (idx === 1) {
			style.background = "#35e3b5"
		}
		if (idx === 2) {
			style.background = "#62eac5"
		}
		return style
	}
	const calculateColor = (idx: number) => {
		let style: CSSProperties = {
			backgroundColor: "#efeeee80"
		}
		if (idx === 0) {
			style.background = "#1cca9b"
		}
		if (idx === 1) {
			style.background = "#35e3b5"
		}
		if (idx === 2) {
			style.background = "#62eac5"
		}

		return style
	}

	return (
		<div className={cssClasses.rankingContainer}>
			{...rankingData.map((driver, idx) => {
				if (idx < 7) {
					return (
						<div className={cssClasses.rankingItem}>
							<div style={calculateColor(idx)} className={cssClasses.position}>{idx + 1}. </div>
							<span style={calculateColor(idx)}>{driver.firstName} {driver.lastName}</span>
							<div style={calculateWidth(driver.rideCount, idx)} className={cssClasses.bar}>

							</div>
							<div style={calculateColor(idx)} className={cssClasses.ridesNumber}>
								{driver.rideCount}
							</div>
						</div>
					)
				}
			})
			}
		</div>
	)
}
export default RankingList

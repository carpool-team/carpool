import { IReportUser } from "../../../interfaces/IReportUser";
import React from "react";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { colorList } from "../../../../../scss/colorList";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";

interface IRankingListProps extends IReactI18nProps {
	users: IReportUser[];
}

const RankingList: (props: IRankingListProps) => JSX.Element = props => {
	const cssClasses = {
		rankingContainer: "report__right--ranking",
		rankingItem: "report__right--ranking--item",
		position: "report__right--ranking--postion",
		bar: "report__right--ranking--bar",
		ridesNumber: "report__right--ranking--ridesNumber",
		noDataLabel: "report__noDataLabel",
	};

	const resources = {
		noData: "group.report.noRankingDataLabel"
	};

	if (props.users && props.users.length > 0) {
		const rankingData = props.users ?? [];
		rankingData.sort((a, b) => (a.rideCount < b.rideCount) ? 1 : -1);
		const maxRides = rankingData[0].rideCount ?? 0;

		const calculateWidth = (ridesNumer: number, idx: number) => {
			let style: CSSProperties = {
				width: (ridesNumer / maxRides * 70).toString() + "%",
				backgroundColor: "#efeeee80"
			};
			if (idx === 0) {
				style.background = "#1cca9b";
			}
			if (idx === 1) {
				style.background = "#35e3b5";
			}
			if (idx === 2) {
				style.background = "#62eac5";
			}
			return style;
		};
		const calculateColor = (idx: number) => {
			let style: CSSProperties = {
				backgroundColor: "#efeeee80"
			};
			if (idx === 0) {
				style.background = "#1cca9b";
			}
			if (idx === 1) {
				style.background = "#35e3b5";
			}
			if (idx === 2) {
				style.background = "#62eac5";
			}

			return style;
		};

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
						);
					}
				})
				}
			</div>
		);
	} else {
		const { t } = props;
		return <span className={cssClasses.noDataLabel}>{t(resources.noData)}</span>;
	}
};
export default withTranslation()(RankingList);;

import { lineString } from "@turf/helpers";
import moment from "moment";
import { sortStops } from "./StopsHelper";
import { parseCoords } from "./UniversalHelper";
import length from "@turf/length";
import { IRide } from "../components/groups/interfaces/IRide";
import { ILocation } from "../components/groups/interfaces/ILocation";
import { IRideStop } from "../components/groups/interfaces/IRideStop";
import { IRideExtended } from "../components/groups/interfaces/IRideExtended";
import i18n from "../i18n";

import colors from "scss_path/_colors.scss";

/**
 * Gets route percentage extension for given location
 * @param {Ride} ride - ride object
 * @param {Location} location - selected location
 */
export const getExtension = (ride: IRide, location: ILocation) => {
	try {
		// Sort stops for original ride
		const { sortedStops } = sortStops(
			ride.location,
			ride.group.location,
			ride.stops,
		);
		// Line between stops
		const line = lineString(sortedStops.map(item => parseCoords(item)));
		// Length of that line
		const lineLength = length(line, { units: "meters" });

		// Stops + selected location
		const stopsWith: IRideStop[] = [...ride.stops, { location, participant: null }];
		// Sort stops including selected location
		const { sortedStops: sortedWith } = sortStops(
			ride.location,
			ride.group.location,
			stopsWith,
		);
		// Line between extended stops
		const lineWith = lineString(sortedWith.map(item => parseCoords(item)));
		// Length of that line
		const lineWithLength = length(lineWith, { units: "meters" });

		// Difference between original routes length and extended routes length
		// Percentage
		const extension = Math.trunc(
			((lineWithLength - lineLength) / lineLength) * 100,
		);

		return extension;
	} catch (err) {
		return undefined;
	}
};

/**
 * Sorts rides using given comparison fn
 * @param data - list of rides
 * @param location - selected lcoation
 * @param compareFunction - compare function, i.e. byExtension
 */
export const sortRides = (data: IRide[], location: ILocation, compareFunction: (a: IRideExtended, b: IRideExtended) => number) => {
	try {
		const extended: IRideExtended[] = [];
		// Get extension for every ride from the list
		data.forEach(item => {
			const extension = getExtension(item, location);

			extended.push({
				...item,
				extension,
			});
		});

		// Sort rides using provided compare function
		const sorted = extended.sort(compareFunction);

		return sorted;
	} catch (err) {
		return data.map(d => ({
			...d,
			extension: -1,
		}));
	}
};

export const byDateAndExtension = (a: IRideExtended, b: IRideExtended) => {
	const isSame = moment(a.rideDate).isSame(b.rideDate, "day");
	if (isSame) {
		if (a.extension < b.extension) {
			return -1;
		}
		if (a.extension > b.extension) {
			return 1;
		}
		return 0;
	}
	return 0;
};

export const byExtension = (a: IRideExtended, b: IRideExtended) => {
	if (a.extension < b.extension) {
		return -1;
	}
	if (a.extension > b.extension) {
		return 1;
	}
	return 0;
};

export const getRideMatchLabel = (matching: number) => {
	if (matching < 15) {
		return i18n.t("ride.matching.perfect");
	}
	if (matching < 30) {
		return i18n.t("ride.matching.great");
	}
	if (matching < 50) {
		return i18n.t("ride.matching.good");
	}
	if (matching < 75) {
		return i18n.t("ride.matching.mediocre");
	}
	if (matching < 100) {
		return i18n.t("ride.matching.bad");
	}
	return i18n.t("ride.matching.terrible");
};

export const getColor = (extension: number) => {
	if (extension < 15) {
		return "#1dd1a1";
	}
	if (extension < 30) {
		return "#00d2d3";
	}
	if (extension < 50) {
		return "#6b98d1";
	}
	if (extension < 75) {
		return "#ff9f43";
	}
	if (extension < 100) {
		return "#ff6b6b";
	}
	return "#ee5253";
};

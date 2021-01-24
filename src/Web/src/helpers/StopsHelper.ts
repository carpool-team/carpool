import { point, featureCollection } from "@turf/helpers";
import nearestPoint from "@turf/nearest";
import { ILocation } from "../components/groups/interfaces/ILocation";
import { IRideStop } from "../components/groups/interfaces/IRideStop";
import { parseCoords } from "./UniversalHelper";
import { Position } from "geojson";

export const equalCoordinates = (point1: Position, point2: Position) =>
	JSON.stringify(point1) === JSON.stringify(point2);

export const sortStops: (start: ILocation, finish: ILocation, stops: IRideStop[]) => {
	sortedStops: ILocation[],
	sortedWaypoints: IRideStop[],
} = (start, finish, stops) => {
	// Copy original array
	let stopsCp = [...stops];

	// Parsed starting point
	const startPoint = point(parseCoords(start));

	// Array to push
	let sorted = [];

	// length -1 because
	// when only 1 point is left it has to be the closest one
	while (sorted.length < stops.length - 1) {
		const points = featureCollection([
			...stopsCp.map(item => point(parseCoords(item.location))),
		]);

		const nearest = nearestPoint(startPoint, points);

		for (let i = 0; i < stopsCp.length; i++) {
			if (
				equalCoordinates(
					parseCoords(stopsCp[i].location),
					nearest.geometry.coordinates,
				)
			) {
				// Push closest point
				sorted = [...sorted, stopsCp[i]];

				// Remove point from array
				stopsCp.splice(i, 1);
			}
		}
	}

	return {
		sortedStops: [
			start,
			...sorted.map(item => item.location),
			...stopsCp.map(item => item.location),
			finish,
		],
		sortedWaypoints: [...sorted, ...stopsCp],
	};
};

import { ILocation } from "../components/groups/interfaces/ILocation";
import { getState } from "../store/Index";
import moment from "moment";

export function isAuthorized(): boolean {
	const res: boolean = Boolean(getState().auth?.tokenInfo?.token);
	console.log(res);
	return res;
}

/** Gets current auth id */
export function getId(): string {
	const res: string = getState().auth?.tokenInfo?.payload?.sub;
	console.log("ID: ", res);
	return res;
}

export function isValidDate(d: any): boolean {
	if (Object.prototype.toString.call(d) === "[object Date]") {
		if (isNaN(d.getTime())) {
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
}

export function foreach<T>(iterable: { [key: string]: T }, callback: (item: T) => void) {
	Object.keys(iterable).forEach(key => {
		callback(iterable[key]);
	});
}

/** Check if each item of dict satisfies a predicate */
export function each<T>(iterable: { [key: string]: T }, predicate: (item: T) => boolean) {
	let result: boolean = true;
	for (let key of Object.keys(iterable)) {
		if (!predicate(iterable[key])) {
			result = false;
			break;
		}
	}
	return result;
}

/** Parses JWT */
export function parseJwt(token): any {
	let base64Url = token.split(".")[1];
	let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	let jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
		return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(""));

	return JSON.parse(jsonPayload);
}
export const parseCoords: (coords: ILocation) => [number, number] = coords => {

	if (coords) {
		const { longitude, latitude } = coords;
		return [longitude, latitude];
	} else {
		// if ("geolocation" in navigator) {
		// 	let userCoords: [number, number] = [52.41, 16.89];
		// 	navigator.geolocation.getCurrentPosition(function (position) {
		// 		userCoords = [position.coords.longitude, position.coords.latitude];
		// 	});
		// 	console.log(userCoords)
		// 	return userCoords

		// } else {
		// 	// LngLat of Pozen
		return [52.41, 16.89];
	}
	// }
};

export const convertDate = (date: string) => {
	if (date) {
		return moment(date).format("YYYY/MM/DD HH:mm");
	}
};

export const compareArrays: (array1: Array<any>, array2: Array<any>) => boolean = (array1, array2) => {
	// if the other array is a falsy value, return
	if (!array2)
		return false;

	// compare lengths - can save a lot of time
	if (array1.length !== array2.length)
		return false;

	for (let i = 0, l = array1.length; i < l; i++) {
		// Check if we have nested arrays
		if (array1[i] instanceof Array && array2[i] instanceof Array) {
			// recurse into the nested arrays
			if (!array1[i].equals(array2[i]))
				return false;
		} else if (array1[i] !== array2[i]) {
			// Warning - two different object instances will never be equal: {x:20} != {x:20}
			return false;
		}
	}
	return true;
};

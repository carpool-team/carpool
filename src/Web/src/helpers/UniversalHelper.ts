import { getState } from "../store/Index";

export function isAuthorized(): boolean {
	return Boolean(getState().auth?.tokenInfo?.token);
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

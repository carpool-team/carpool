import { getState } from "../store/Index";

export function isAuthorized(): boolean {
	return Boolean(getState().auth?.tokenInfo?.token);
}

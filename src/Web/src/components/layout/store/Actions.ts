import {
	IRedirectAction,
	IRedirectedAction,
	LayoutActionTypes
} from "./Types";

//#region LAYOUT
export function redirect(to: string): IRedirectAction {
	return {
		type: LayoutActionTypes.Redirect,
		to
	};
}

export function redirected(): IRedirectedAction {
	return {
		type: LayoutActionTypes.Redirected,
	};
}
//#endregion

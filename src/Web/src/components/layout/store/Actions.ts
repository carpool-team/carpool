import {
	IRedirectAction,
	IRedirectedAction,
	ISetLoaderVisibleAction,
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

export function setLoaderVisible(visible: boolean): ISetLoaderVisibleAction {
	return {
		type: LayoutActionTypes.SetLoaderVisible,
		visible,
	};
}
//#endregion

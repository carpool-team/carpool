import { Action } from "redux";

export enum LayoutActionTypes {
	Redirect = "LAYOUT_REDIRECT",
	Redirected = "LAYOUT_REDIRECTED",
}

//#region LAYOUT

export interface IRedirectAction extends Action<LayoutActionTypes.Redirect> {
	to: string;
}

export interface IRedirectedAction extends Action<LayoutActionTypes.Redirected> { }
//#endregion

/** Type of login action */
export type LayoutAction =
	IRedirectAction |
	IRedirectedAction;

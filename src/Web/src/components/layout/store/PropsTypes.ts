import { redirect, redirected } from "./Actions";
import { ILayoutState } from "./State";
import { IRedirectAction, IRedirectedAction } from "./Types";

interface IStatePropsType {
	layout: ILayoutState;
}

interface IStateFromProps {
	redirectTo: string;
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	redirectTo: state.layout.redirectTo,
});

interface IDispatchPropsType {
	redirect: (to: string) => IRedirectAction;
	redirected: () => IRedirectedAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	redirect,
	redirected,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;

import { init } from "../../auth/store/Actions";
import { IAuthState } from "../../auth/store/State";
import { IAuthInitAction } from "../../auth/store/Types";
import { redirect, redirected, setLoaderVisible } from "./Actions";
import { ILayoutState } from "./State";
import { IRedirectAction, IRedirectedAction, ISetLoaderVisibleAction } from "./Types";

interface IStatePropsType {
	layout: ILayoutState;
	auth: IAuthState;
}

interface IStateFromProps {
	redirectTo: string;
	loaderVisible: boolean;
	authInitializing: boolean;
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	redirectTo: state.layout.redirectTo,
	loaderVisible: state.layout.loaderVisible,
	authInitializing: state.auth.initializing,
});

interface IDispatchPropsType {
	redirect: (to: string) => IRedirectAction;
	redirected: () => IRedirectedAction;
	setLoaderVisible: (visible: boolean) => ISetLoaderVisibleAction;
	authInit: () => IAuthInitAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	redirect,
	redirected,
	setLoaderVisible,
	authInit: init,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;

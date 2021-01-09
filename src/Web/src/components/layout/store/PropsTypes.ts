import { init } from "../../auth/store/Actions";
import { IAuthInitAction } from "../../auth/store/Types";
import { redirect, redirected, setLoaderVisible } from "./Actions";
import { ILayoutState } from "./State";
import { IRedirectAction, IRedirectedAction, ISetLoaderVisibleAction } from "./Types";

interface IStatePropsType {
	layout: ILayoutState;
}

interface IStateFromProps {
	redirectTo: string;
	loaderVisible: boolean;
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	redirectTo: state.layout.redirectTo,
	loaderVisible: state.layout.loaderVisible,
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

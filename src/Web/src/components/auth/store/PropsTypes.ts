import { setLoaderVisible } from "../../layout/store/Actions";
import { ISetLoaderVisibleAction } from "../../layout/store/Types";
import { ILoginFormData } from "../login/LoginPanel";
import { IRegisterFormData } from "../register/RegisterPanel";
import { login, logout, register } from "./Actions";
import { IAuthState } from "./State";
import { ILoginAction, ILogoutAction, IRegisterAction } from "./Types";

interface IStatePropsType {
	auth: IAuthState;
}

interface IStateFromProps {
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = state => ({
});

interface IDispatchPropsType {
	login: (data: ILoginFormData) => ILoginAction;
	logout: () => ILogoutAction;
	register: (data: IRegisterFormData) => IRegisterAction;
	setLoaderVisible: (visible: boolean) => ISetLoaderVisibleAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	login,
	register,
	setLoaderVisible,
	logout: logout,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;

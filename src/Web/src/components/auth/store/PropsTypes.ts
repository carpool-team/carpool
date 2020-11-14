import { ILoginFormData } from "../login/LoginPanel";
import { IRegisterFormData } from "../register/RegisterPanel";
import { login, register } from "./Actions";
import { IAuthState } from "./State";
import { ILoginAction, IRegisterAction } from "./Types";

interface IStatePropsType {
	auth: IAuthState;
}

interface IStateFromProps {
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = () => ({
});

interface IDispatchPropsType {
	login: (data: ILoginFormData) => ILoginAction;
	register: (data: IRegisterFormData) => IRegisterAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	login,
	register,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;

import { setLoaderVisible } from "../../layout/store/Actions";
import { ISetLoaderVisibleAction } from "../../layout/store/Types";
import { IChangePasswordFormData } from "../interfaces/IChangePasswordFormData";
import { IUserData } from "../interfaces/IUserData";
import { IUserProfileFormData } from "../interfaces/IUserProfileFormData";
import { changePassword, getData, updateData } from "./Actions";
import { IUserProfileState } from "./State";
import { IChangePasswordAction, IGetDataAction, IUpdateDataAction } from "./Types";

interface IStatePropsType {
	userProfile: IUserProfileState;
}

interface IStateFromProps {
	userData: IUserData;
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = state => ({
	userData: state.userProfile.userData,
});

interface IDispatchPropsType {
	getData: () => IGetDataAction;
	updateData: (data: IUserProfileFormData) => IUpdateDataAction;
	setLoaderVisible: (visible: boolean) => ISetLoaderVisibleAction;
	changePassword: (data: IChangePasswordFormData) => IChangePasswordAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	getData,
	updateData,
	changePassword,
	setLoaderVisible,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;

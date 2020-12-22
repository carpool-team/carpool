import { IChangePasswordFormData } from "../interfaces/IChangePasswordFormData";
import { IUserProfileFormData } from "../interfaces/IUserProfileFormData";
import { IChangePasswordAction, IGetDataAction, IUpdateDataAction, UserProfileActionTypes } from "./Types";

//#region UISER PROFILE

export function getData(): IGetDataAction {
	return {
		type: UserProfileActionTypes.GetData,
	};
}

export function updateData(data: IUserProfileFormData): IUpdateDataAction {
	return {
		type: UserProfileActionTypes.UpdateData,
		data,
	};
}

export function changePassword(data: IChangePasswordFormData): IChangePasswordAction {
	return {
		type: UserProfileActionTypes.ChangePassword,
		data,
	};
}

//#endregion

import React, { Component } from "react";
import produce from "immer";
import _ from "lodash";
import SecondStep from "./SecondStep";
import FirstStep from "./FirstStep";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../../components/system/resources/IReactI18nProps";
import { IGroupCallbacks } from "../../interfaces/IGroupCallbacks";
import { IFormData, initialFormData } from "./interfaces/IFormData";
import { IGroup } from "../../interfaces/IGroup";
import { mainRoutes } from "../../../layout/components/LayoutRouter";
import { IFormUserData } from "./interfaces/IFormUserData";

interface IAddGroupFormScreenProps extends IReactI18nProps {
	callbacks: IGroupCallbacks;
	userId: string;
}

interface IAddGroupFormScreenState {
	formData: IFormData;
}

class AddGroupFormScreen extends Component<IAddGroupFormScreenProps, IAddGroupFormScreenState> {
	constructor(props: IAddGroupFormScreenProps) {
		super(props);
		this.state = {
			formData: initialFormData
		};
	}

	/**
	 * Generic handler for changing form data
	 *
	 * @param newValue new value to assign
	 * @param key form data object value key to assign to
	 */
	private changeHandler = (newValue: string, key: string) => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			_.set(draft.formData, key, newValue);
		}));
	}

	/** Increments form step */
	private incrementStep = () => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.formData.step += 1;
		}));
	}

	/** Decrements form step */
	private decrementStep = () => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.formData.step -= 1;
		}));
	}

	private addUser = () => {
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.formData.users.push(this.state.formData.user);
			draft.formData.user = initialFormData.user;
		}));
	}
	private removeUser = (user: IFormUserData) => {
		const users = this.state.formData.users.filter(item => item !== user);
		this.setState(produce((draft: IAddGroupFormScreenState) => {
			draft.formData.users = users;
		}));
	}

	private createGroup = () => {
		let group: IGroup = {
			id: 0,
			name: this.state.formData.group.groupName,
			code: this.state.formData.group.code,
			owner: this.props.userId,
			location: this.state.formData.group.location,
			rideCount: 0,
			userCount: this.state.formData.users.length,
			// users: this.state.formData.users.map(user => ({
			// 	name: user.name,
			// })),
		};
		this.props.callbacks.addGroup(group);
		this.props.callbacks.redirect("/" + mainRoutes.groups); // make path absolute
	}

	private renderFirstStep = () => (
		<FirstStep
			data={this.state.formData}
			callbacks={{
				handleChange: this.changeHandler,
				incrementStep: this.incrementStep
			}}
		/>
	)

	private renderSecondStep = () => (
		<SecondStep
			data={this.state.formData}
			callbacks={{
				handleChange: this.changeHandler,
				decrementStep: this.decrementStep,
				createGroup: this.createGroup,
				addUser: this.addUser,
				removeUser: this.removeUser
			}}
		/>
	)

	render() {
		if (this.state.formData.step === 1) {
			return this.renderFirstStep();
		} else if (this.state.formData.step === 2) {
			return this.renderSecondStep();
		} else {
			throw "Unhandled add group form step";
		}
	}
}

export default withTranslation()(AddGroupFormScreen);

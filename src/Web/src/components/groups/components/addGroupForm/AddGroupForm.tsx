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
import LayoutRouter from "../../../layout/components/LayoutRouter";

const tempUserId: string = "8151a9b2-52ee-4ce0-a2dd-08d7f7744d91"; // TODO: ZAORAĆ, NIE MAGIC STRING
interface IAddGroupFormScreenProps extends IReactI18nProps {
	callbacks: IGroupCallbacks;
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

	private createGroup = () => {
		let group: IGroup = {
			name: this.state.formData.group.groupName,
			code: this.state.formData.group.code,
			owner: tempUserId,
			location: {
				coordinates: { // TODO: legit lat,lng
					latitude: 0,
					longtitude: 0,
				},
				name: this.state.formData.group.address
			},
			rideCount: 0,
			userCount: this.state.formData.users.length
			// users: this.state.formData.users.map(user => ({
			// 	name: user.name,
			// 	surname: user.surname,
			// 	email: user.email,
			// })),
		};
		this.props.callbacks.addGroup(group);
		this.props.callbacks.redirect("/" + LayoutRouter.routes.groups); // make path absolute
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

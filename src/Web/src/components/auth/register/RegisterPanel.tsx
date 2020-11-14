import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { ButtonColor } from "../../ui/button/enums/ButtonColor";
import { InputIcon } from "../../ui/input/enums/InputIcon";
import { InputType } from "../../ui/input/enums/InputType";
import Input from "../../ui/input/Input";
import {
	StateProps,
	DispatchProps,
	mapStateToProps,
	mapDispatchToProps,
} from "../store/PropsTypes";

import "./RegisterPanel.scss";

interface IRegisterPanelProps extends IReactI18nProps, RouteComponentProps, StateProps, DispatchProps { }

const RegisterPanel = (props: IRegisterPanelProps) => {
	const cssClasses = {
		container: "form__container",
		inputs: "form__inputs"
	};

	const dataKeys = {
		groupName: "group.groupName",
		code: "group.code",
		address: "group.address"
	};

	const resources = {
		nextBtn: "nextBtn",
		groupNameInput: "groups.addGroupForm.groupName",
		groupCodeInput: "groups.addGroupForm.code",
		groupCodeInputComment: "groups.addGroupForm.codeInputComment",
		addressInput: "groups.addGroupForm.address",
		basicInfo: "groups.addGroupForm.basicInfo"
	};

	const { t } = props;

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.inputs}>
				<span>{t(resources.basicInfo)}</span>
				<Input
					type={InputType.Text}
					changeHandler={newValue => { }}
					placeholder={t(resources.groupNameInput)}
					value={null}
					icon={InputIcon.Globe}
				/>
				<Input
					type={InputType.Text}
					changeHandler={newValue => { }}
					placeholder={t(resources.groupCodeInput)}
					// commment={t(resources.groupCodeInputComment)}
					value={null}
					icon={InputIcon.Code}
				/>
				<Input
					type={InputType.Text}
					changeHandler={newValue => { }}
					placeholder={t(resources.addressInput)}
					value={null}
					icon={InputIcon.Location}
				/>
				{/* <Button onClick={props.callbacks.incrementStep} color={ButtonColor.White} background = {ButtonBackground.Blue}>
					{t(resources.nextBtn)}
				</Button> */}
			</div>
		</div>
	);
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withTranslation(),
	withRouter,
)(RegisterPanel);

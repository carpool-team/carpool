import React from "react";
import { Popover } from "@material-ui/core";
import Button from "../../../../../../ui/button/Button";
import { ButtonColor } from "../../../../../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../../../../../ui/button/enums/ButtonBackground";
import { IReactI18nProps } from "../../../../../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";

interface ILeaveGroupModalProps extends IReactI18nProps {
	open: boolean;
	handleClose: () => void;
	onLeaveConfirm: () => void;
}

const LeaveGroupModal: React.FC<ILeaveGroupModalProps> = props => {
	const cssClasses = {
		container: "auth__popover",
		buttonContainer: "auth__inputs--buttonContainer",
		button: "auth__inputs--button",
	};

	const resources = {
		leaveConfirm: "groups.list.leaveConfirm",
		yes: "yes",
		no: "no",
	};

	const { t } = props;

	return <Popover
		open={props.open}
		onClose={props.handleClose}
		anchorOrigin={{
			vertical: "center",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "center",
			horizontal: "center",
		}}
	>
		<div className={cssClasses.container}>
			<span>{t(resources.leaveConfirm)}</span>
			<div className={cssClasses.buttonContainer}>
				<Button
					additionalCssClass={cssClasses.button}
					onClick={props.onLeaveConfirm}
					color={ButtonColor.White}
					background={ButtonBackground.Red}
				>
					{t(resources.yes)}
				</Button>
				<Button
					additionalCssClass={cssClasses.button}
					onClick={props.handleClose}
					color={ButtonColor.White}
					background={ButtonBackground.Blue}
				>
					{t(resources.no)}
				</Button>
			</div>
		</div>
	</Popover>;

};

export default withTranslation()(LeaveGroupModal);

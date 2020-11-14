import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import {
	StateProps,
	DispatchProps,
	mapStateToProps,
	mapDispatchToProps,
} from "../store/PropsTypes";

interface ILoginPanelProps extends RouteComponentProps, StateProps, DispatchProps { }

const LoginPanel = (props: ILoginPanelProps) => {
	console.log(props.match);
	return (
		<div>
			LOGIN
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
)(LoginPanel);

import React, { Component } from "react";
import "./LoadingScreen.scss";

export default class LoadingScreen extends Component {
	render: () => JSX.Element = () => {
		return (
			<div>
				<div className="map">
					<div className="quote">Share a ride</div>
				</div>
			</div>
		);
	}
}

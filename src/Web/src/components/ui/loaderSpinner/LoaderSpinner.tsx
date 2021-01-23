import React from "react";
import "./LoaderSpinner.scss";

const LoaderSpinner: () => JSX.Element = () => {
	const cssClasses = {
		main: "lds-ring",
	};

	return (
		<div className={cssClasses.main}>
			<div />
			<div />
			<div />
			<div />
		</div>
	);
};

export default LoaderSpinner;

import React from "react";
import LoaderSpinner from "../loaderSpinner/LoaderSpinner";

import "./LoaderBlock.scss";

interface ILoaderBlockProps {
	fullHeight?: boolean;
}

const LoaderBlock = (props: ILoaderBlockProps) => {
	const cssClasses = {
		main: "loaderBlock",
		fullHeightMod: "--fullHeight",
	};

	let cssClass = cssClasses.main;

	if (props.fullHeight) {
		cssClass += " " + cssClasses.main + cssClasses.fullHeightMod;
	}

	return (
		<div className={cssClass}>
			<LoaderSpinner />
		</div>
	);
};

export default LoaderBlock;

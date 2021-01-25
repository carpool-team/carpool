import React from "react";
import LoaderSpinner from "../loaderSpinner/LoaderSpinner";

import "./LabelBlock.scss";

interface ILabelBlockProps {
	fullHeight?: boolean;
	text: string;
}

const LabelBlock = (props: ILabelBlockProps) => {
	const cssClasses = {
		main: "labelBlock",
		fullHeightMod: "--fullHeight",
		text: "labelBlock__text",
	};

	let cssClass = cssClasses.main;

	if (props.fullHeight) {
		cssClass += " " + cssClasses.main + cssClasses.fullHeightMod;
	}

	return (
		<div className={cssClass}>
			<span className={cssClasses.text}>
				{props.text}
			</span>
		</div>
	);
};

export default LabelBlock;

import React, { useLayoutEffect } from "react";
import LoaderSpinner from "../loaderSpinner/LoaderSpinner";
import "./LoaderSplash.scss";

interface ILoaderSplashProps {
	active: boolean;
	height?: number;
}

const LoaderSplash: React.FunctionComponent<ILoaderSplashProps> = (props) => {
	return (
		<>
			{props.active ? <div
				style={{
					height: props.height
				}}
				className={"loaderSplash loaderSplash--fullScreen"}
			>
				<LoaderSpinner />
			</div> : null}
			{props.children}
		</>
	);
};

export default LoaderSplash;

import React from "react";
import { ILoaderSpinnerProps } from "./interfaces/ILoaderSpinnerProps";

export class LoaderSpinner extends React.PureComponent<ILoaderSpinnerProps> {
	static defaultProps = {
		cssClass: "",
		width: 55,
		height: 55,
		strokeWidth: "6",
	};

	private cssClasses = {
		main: "loaderSpinner",
		circle: "loaderSpinner__circle"
	};

	render: () => JSX.Element = () => (
		<div className={[this.cssClasses.main, this.props.cssClass].join(" ")}>
			<svg
				width={this.props.width + "px"}
				height={this.props.height + "px"}
				viewBox={"0 0 66 66"}
				xmlns={"http://www.w3.org/2000/svg"}
			>
				<circle
					className={this.cssClasses.circle}
					fill={"none"}
					strokeWidth={this.props.strokeWidth}
					strokeLinecap={"round"}
					cx={"33"}
					r={"30"}
				/>
			</svg>
		</div>
	)
}

import React from "react";
import { IFormData } from "./interfaces/IFormData";

interface ISecondStepCallbacks {

}

interface ISecondStepProps {
	data: IFormData;
	callbacks: ISecondStepCallbacks;
}

const SecondStep: (props: ISecondStepProps) => JSX.Element = props => {
	const cssClasses = {
		container: "formSecondSide__container",
	};

	return (
		<div className={cssClasses.container}>
			<ul>
				In progress. Data provided:
				<li>
					{props.data.groupName}
				</li>
				<li>
					{props.data.code}
				</li>
				<li>
					{props.data.address}
				</li>
			</ul>
		</div>
	);
};

export default SecondStep;
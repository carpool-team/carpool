import React from "react";
import { IGroup } from "../../interfaces/IGroup";

export interface IAddGroupProps {
	group: IGroup;
}

const AddRideFormScreen: React.FunctionComponent<IAddGroupProps> = props => {

	return (
		<div >
			{props.group.code}
		</div>
	);
};

export default AddRideFormScreen;

import React from "react";
import { IGroup } from "../../../interfaces/IGroup";

interface IGroupDetailsProps {
	group: IGroup;
	unselectGroup: () => void;
}

const GroupDetails = (props: IGroupDetailsProps) => {
	return (
		<><div>
			TEST: {props.group.name}
		</div>
			<button onClick={() => props.unselectGroup()}>CLOSE</button>
		</>
	);
};

export default GroupDetails;

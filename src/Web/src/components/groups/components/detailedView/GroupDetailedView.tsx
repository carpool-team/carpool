import React from "react";
import { useHistory } from "react-router";
import LayoutRouter from "../../../layout/components/LayoutRouter";
import Button from "../../../navBar/navButton/NavButton";
import { IGroup } from "../../interfaces/IGroup";

export interface IGroupDetailedViewProps {
	group: IGroup;
}

const GroupDetailedView: React.FunctionComponent<IGroupDetailedViewProps> = props => {
	const history = useHistory();
	return (
		<div>
			{props.children}
			<Button onClick={() => {
				history.push(`/${LayoutRouter.routes.groups}`);
			}}
			>
				{"CLOSE"}
			</Button>
		</div>
	);
};

export default GroupDetailedView;

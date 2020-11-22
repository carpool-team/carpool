import React from "react";
import { IGroup } from "../../interfaces/IGroup";
import GroupDetailedView, { IGroupDetailedViewProps } from "../detailedView/GroupDetailedView";
import RidesList from "./components/RidesList";
import { useHistory } from "react-router";
import Button from "../../../ui/button/Button";
import {ButtonBackground} from "../../../ui/button/enums/ButtonBackground";
import {ButtonColor} from "../../../ui/button/enums/ButtonColor";
import LayoutRouter from "../../../layout/components/LayoutRouter";
import ridesExample from "../../../../examples/exampleRides";
import { IRide } from "../../../../components/groups/interfaces/IRide";
import MediaQuery from "react-responsive";

interface IGroupRidesProps extends IGroupDetailedViewProps {
}

const GroupRides = (props: IGroupRidesProps) => {
	const history = useHistory();
	const cssClasses = {
		container: "ridesContainer",
		leftPanel: "rides--leftPanel",
		rightPanel: "rides--rightPanel",
		rightTopPanel: "rides--rightPanel__top",
		rightBottomPanel: "rides--rightPanel__bottom",
		leftLabels: "rides--leftPanel__label",
		leftList: "rides--leftPanel__list",
		leftOutline: "rides--leftPanel__outline",
		leftLabelsText: "rides--leftPanel__text"
	};

	const rides: IRide[] = ridesExample;

	return (
		<GroupDetailedView group={props.group}>
			<div className = {cssClasses.leftPanel}>
				<div className ={cssClasses.leftLabels}>
					<Button onClick={() => {
						history.push(`/${LayoutRouter.routes.groups}`);
							}}
							background={ButtonBackground.Blue}
							color={ButtonColor.White}
						>
							{"Wróć"}
					</Button>
				<div className={cssClasses.leftLabelsText}> {props.group.name}</div>
				</div>
				<div className={cssClasses.leftOutline}></div>
				<div className = {cssClasses.leftList}>
					<RidesList rides ={rides}/>
				</div>
			</div>
			<MediaQuery query="(min-width: 900px)">
				<div className= {cssClasses.rightPanel}>
					<div className = {cssClasses.rightTopPanel}>

					</div>
					<div className = {cssClasses.rightBottomPanel}>

					</div>
				</div>
			</MediaQuery>
		</GroupDetailedView>

	);
};

export default GroupRides;

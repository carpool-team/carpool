import {
	IAddGroupAction,
	GroupsActionTypes
} from "./Types";
import { IGroup } from "../interfaces/IGroup";

export function addGroup(group: IGroup): IAddGroupAction {
	return {
		type: GroupsActionTypes.AddGroup,
		group,
	};
}
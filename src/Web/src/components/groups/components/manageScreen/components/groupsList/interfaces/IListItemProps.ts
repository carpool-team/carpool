import { IGroup } from "../../../../../interfaces/IGroup";

export interface IListItemProps {
	group: IGroup;
	color: string;
	setGroupSelected: () => void;
}

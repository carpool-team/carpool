import { IGroup } from "./IGroup";

/** Callbacks interface for groups */
export interface IGroupCallbacks {
  addGroup: (group: IGroup) => void;
  getGroups: () => IGroup[];
  redirect: (route: string) => void;
}

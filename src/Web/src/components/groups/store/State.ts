import { IGroup } from "../interfaces/IGroup";
import { IInvite } from "../interfaces/IInvite";

/** Groups state interface */
export interface IGroupsState {
  /** List of groups */
  groups: IGroup[];
}
export interface IInvitesState {
  invites: IInvite[];
}

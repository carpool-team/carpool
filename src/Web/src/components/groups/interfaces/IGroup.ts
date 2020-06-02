import { IGroupUser } from "./IGroupUser";

/** Group interface */
export interface IGroup {
  location: {
    coordinates: {
      latitude: number;
      longtitude: number;
    };
    name: string;
  };
  name: string;
  rideCount: number;
  userCount: number;
  //users: IGroupUser[];
}

export interface IGroupBase {
	groupId: string;
	// location: ILocation[];
	location: {
		longitude: number;
		latitude: number;
	};
	rideCount: number;
	name: string;
}

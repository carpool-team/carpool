/** Group interface */
export interface IGroup {
	location: {
		coordinates: {
			latitude: number;
			longtitude: number;
		};
		name: string;
	};
	code: string;
	name: string;
	rideCount: number;
	userCount: number;
}

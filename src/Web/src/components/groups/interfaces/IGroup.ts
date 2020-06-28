/** Group interface */
export interface IGroup {
	id: string;
	location: {
		coordinates: {
			latitude: number;
			longtitude: number;
		};
		name: string;
	};
	code: string;
	name: string;
	owner: string;
	rideCount: number;
	userCount: number;
	selected?: boolean;
}

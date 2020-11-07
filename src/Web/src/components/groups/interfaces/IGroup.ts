/** Group interface */
export interface IGroup {
	id: string;
	location: {
		longtitude: number;
		latitude: number;
		rideCount: number;
	};
	code?: string;
	name?: string;
	owner?: string;
	userCount?: number;
	selected?: boolean;
}

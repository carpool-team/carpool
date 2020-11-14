export interface ILocation {
	coordinates: {
		longitude: number;
		latitude: number;
		coordinatesId: string;
	};
	locationName: {
		id: string;
		name: string;
	};
	id: string;
}

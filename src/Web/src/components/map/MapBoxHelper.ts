import mapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import mapboxDirections from "@mapbox/mapbox-sdk/services/directions";

export const mapboxKey: string = process.env.MAPBOX_KEY;

export const mapboxStyle: string = process.env.MAPLIGHT;

export const getGeocodingClient = () => mapboxGeocoding({ accessToken: mapboxKey });

export const getDirectionsClient = () => mapboxDirections({ accessToken: mapboxKey });

export const getDefaultBounds = (): [[number, number], [number, number]] => [[16.907883, 52.473654], [16.960580, 52.457061]];

export const onGetName = async (coords: [number, number]): Promise<string> => {
	try {
		const response = await getGeocodingClient()
			.reverseGeocode({
				query: coords,
				mode: "mapbox.places",
			})
			.send();
		const result = response.body.features[0];
		if (result !== undefined && result.hasOwnProperty("place_name")) {
			return (result.place_name);
		} else {
			return (" Błąd pobrania nazwy lokalizacji ");
		}
	} catch (err) {
		console.log(err);
	}
};

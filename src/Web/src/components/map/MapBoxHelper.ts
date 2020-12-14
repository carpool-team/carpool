import mapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import mapboxDirections from "@mapbox/mapbox-sdk/services/directions";

export const mapboxKey: string = process.env.MAPBOX_KEY;

export const mapboxStyle: string = process.env.MAPLIGHT;

export const getGeocodingClient = () => mapboxGeocoding({ accessToken: mapboxKey });

export const getDirectionsClient = () => mapboxDirections({ accessToken: mapboxKey });

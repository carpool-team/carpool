import mapboxClient from '@mapbox/mapbox-sdk';
import mapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxDirections from '@mapbox/mapbox-sdk/services/directions';
import config from '../../config';

export const baseClient = mapboxClient({accessToken: config.mapboxKey});
export const geocodingClient = mapboxGeocoding(baseClient);
export const directionsClient = mapboxDirections(baseClient);

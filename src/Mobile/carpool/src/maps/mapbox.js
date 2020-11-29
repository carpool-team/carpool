import mapboxClient from '@mapbox/mapbox-sdk';
import mapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxDirections from '@mapbox/mapbox-sdk/services/directions';
import {MAPBOX_KEY} from '@env';

export const baseClient = mapboxClient({accessToken: MAPBOX_KEY});
export const geocodingClient = mapboxGeocoding(baseClient);
export const directionsClient = mapboxDirections(baseClient);

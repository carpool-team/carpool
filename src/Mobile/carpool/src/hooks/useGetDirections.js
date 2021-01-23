import React, {useState} from 'react';
import {directionsClient} from '../maps/mapbox';

const defaultConfig = {
  profile: 'driving',
  overview: 'full',
  geometries: 'geojson',
  alternatives: 'true',
};

export default (useGetDirections = (config = defaultConfig) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const _execute = async stops => {
    try {
      setLoading(true);

      const waypoints = stops.map(stop => ({
        coordinates: stop,
      }));

      const response = await directionsClient
        .getDirections({
          ...config,
          waypoints,
        })
        .send();

      setResults(response);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return [results, loading, error, _execute];
});

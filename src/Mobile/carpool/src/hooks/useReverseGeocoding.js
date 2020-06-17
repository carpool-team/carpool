import {useState} from 'react';
import {geocodingClient} from '../maps/mapbox';

export default useReverseGeocoding = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const _execute = async query => {
    try {
      setLoading(true);
      const response = await geocodingClient
        .reverseGeocode({
          query: query,
        })
        .send();

      setResults(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return [results, loading, error, _execute];
};

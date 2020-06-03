import React, {useState, useEffect} from 'react';
import {geocodingClient} from '../maps/mapbox';
import Geolocation from '@react-native-community/geolocation';

export default useForwardGeocoding = (
  place,
  config = {
    autocomplete: false,
    countries: ['pl'],
  },
  optimized = false,
  trigger = 3,
) => {
  const [currentPosition, setCurrentPosition] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const {longitude, latitude} = info.coords;
      setCurrentPosition([longitude, latitude]);
    });
  }, []);

  const onSearch = async () => {
    try {
      setLoading(true);

      let body = {
        query: place,
        ...config,
      };

      if (optimized) {
        body.proximity = currentPosition;
      }

      const response = await geocodingClient.forwardGeocode(body).send();
      console.log('RESSS', response);

      if (response.statusCode === 200) {
        const {features} = response.body;
        setResults([...features]);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (place) {
      if (place.length > trigger) {
        onSearch();
      } else {
        results.length && setResults([]);
      }
    } else {
      results.length && setResults([]);
    }
  }, [place]);

  return [results, loading, error, onSearch];
};

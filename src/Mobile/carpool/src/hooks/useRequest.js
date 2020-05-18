import React, {useState, useEffect} from 'react';
import config from '../../config';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
};

export const ENDPOINTS = {
  GET_ALL_RIDES: '/Rides',
};

/**
 *
 * @param {string} method - request method (GET, POST etc.)
 * @param {string} endpoint - request endpoint (i.e. /Rides)
 * @param {object} body - request body
 */
const useRequest = (method, endpoint, body = null) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const _execute = async () => {
    try {
      setLoading(true);

      let request = {};
      let headers = {
        'Content-Type': 'application/json',
      };

      request.method = method;
      request.headers = {...headers};

      if (body) {
        request.body = JSON.stringify(body);
      }

      const res = await fetch(`${config.devUrl}${endpoint}`, request);

      if (res.status > 399) {
        setError('Error occured');
      } else {
        const json = await res.json();
        setResponse(json);
      }
    } catch (error) {
      setError(error);
      console.log('ERROR OCCURED');
    } finally {
      setLoading(false);
    }
  };

  return [response, loading, error, _execute];
};

export default useRequest;

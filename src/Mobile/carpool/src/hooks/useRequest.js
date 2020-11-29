import React, {useState} from 'react';
import {API_URL} from '@env';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};

export const ENDPOINTS = {
  // GET
  GET_ALL_RIDES: '/Rides',
  GET_USERS_RIDES: id => `/Users/${id}/rides/participated`,
  GET_USER_GROUPS: id => `/Users/${id}/groups`,
  GET_USER_INVITATIONS: id => `/Users/${id}/groupInvites`,

  // POST
  // SEND_RIDE_REQUEST: id => `/users/${id}/rideRequests`,
  SEND_RIDE_REQUEST: id => `/RideRequests`,
  // CREATE_NEW_RIDE: id => `/users/${id}/rides`,
  CREATE_NEW_RIDE: id => `/Rides`,

  // PUT
  // ADD_PARTICIPANT: id => `/rides/${id}/users`,
  ADD_PARTICIPANT: id => `/Rises/${id}/users`,
  // CHANGE_INVITATION_STATE: id => `/groupinvites/${id}`,
  CHANGE_INVITATION_STATE: id => `/Groupinvites/${id}`,
  // GET_DRIVERS_RIDES: id => `/users/${id}/rides/owned`,
  GET_DRIVERS_RIDES: id => `/Users/${id}/rides/owned`,
  // GET_DRIVERS_PAST_RIDES: id => `/users/${id}/rides/owned?past=true`,
  GET_DRIVERS_PAST_RIDES: id => `/Users/${id}/rides/owned?past=true`,
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

      const res = await fetch(`${API_URL}${endpoint}`, request);

      if (res.status > 399) {
        setError('Error occured');
      } else {
        const json = await res.json();
        setResponse(json);
      }
    } catch (error) {
      setError(error);
      console.log('ERROR OCCURED', error);
    } finally {
      setLoading(false);
    }
  };

  return [response, loading, error, _execute];
};

export default useRequest;

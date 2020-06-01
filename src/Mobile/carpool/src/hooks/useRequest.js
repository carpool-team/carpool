import React, {useState, useEffect} from 'react';
import config from '../../config';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};

export const ENDPOINTS = {
  // GET
  // GET_ALL_RIDES: '/Rides',
  GET_ALL_RIDES: '/rides',
  // GET_USERS_RIDES: id => `/Rides/GetUserRides/${id}`,
  GET_USERS_RIDES: id => `/users/${id}/rides`,
  // GET_USER_GROUPS: id => `/groups/GetUserGroups/${id}`,
  GET_USER_GROUPS: id => `/users/${id}/groups`,
  // GET_USER_INVITATIONS: id => `/GroupInvites/GetUserInvites/${id}`,
  GET_USER_INVITATIONS: id => `/users/${id}/groupInvites`,
  // POST
  // SEND_RIDE_REQUEST: '/RideRequests',
  SEND_RIDE_REQUEST: id => `/users/${id}/rideRequests`,
  // PUT
  // ADD_PARTICIPANT: '/Rides/AddParticipant',
  ADD_PARTICIPANT: id => `/rides/${id}/users`,
  // CHANGE_INVITATION_STATE: '/GroupInvites',
  CHANGE_INVITATION_STATE: id => `/groupinvites/${id}`,
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
      console.log('ERROR OCCURED', error);
    } finally {
      setLoading(false);
    }
  };

  return [response, loading, error, _execute];
};

export default useRequest;

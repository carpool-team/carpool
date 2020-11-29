import {API_URL} from '@env';

export const apiRequest = async (method, endpoint, body = null) => {
  try {
    let request = {};
    let headers = {
      'Content-Type': 'application/json',
    };
    request.method = method;
    request.headers = {...headers};

    if (body) {
      request.body = JSON.stringify(body);
    }

    console.log(method, endpoint, request);
    const res = await fetch(`${API_URL}${endpoint}`, request);

    if (res.status > 399) {
      console.log('ERROR', res);
    } else {
      const json = await res.json();
      return json;
    }
  } catch (error) {
    return error;
  }
};

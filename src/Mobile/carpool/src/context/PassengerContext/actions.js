import {PassengerActions} from '.';
import {apiRequest} from '../../utils/apiRequest';
import {METHODS, ENDPOINTS} from '../../hooks';
const userId = 'ba5c33df-0c92-4324-19c7-08d8778cb545';

export const createGetAllRides = async dispatch => {
  try {
    dispatch({type: PassengerActions.GET_ALL_RIDES_LOADING});
    const response = await apiRequest(
      METHODS.GET,
      `${ENDPOINTS.GET_ALL_RIDES}?userId=${userId}`,
    );

    dispatch({
      type: PassengerActions.GET_ALL_RIDES_SUCCESS,
      payload: [...response],
    });
  } catch (err) {
    dispatch({type: PassengerActions.GET_ALL_RIDES_ERROR, payload: err});
  }
};

export const createGetUserRides = async dispatch => {
  try {
    dispatch({type: PassengerActions.GET_ALL_RIDES_LOADING});
    const response = await apiRequest(
      METHODS.GET,
      ENDPOINTS.GET_USERS_RIDES(userId),
    );
    dispatch({
      type: PassengerActions.GET_USER_RIDES_SUCCESS,
      payload: [...response],
    });
  } catch (err) {
    dispatch({type: PassengerActions.GET_USER_RIDES_ERROR, payload: err});
  }
};

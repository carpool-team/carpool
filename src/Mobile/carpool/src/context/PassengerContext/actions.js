import {PassengerActions} from '.';
import {apiRequest} from '../../utils/apiRequest';
import {METHODS, ENDPOINTS} from '../../hooks';
const userId = '8151a9b2-52ee-4ce0-a2dd-08d7f7744d91';

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

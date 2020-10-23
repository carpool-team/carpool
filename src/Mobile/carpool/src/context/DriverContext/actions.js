import {DriverActions} from '.';
import {apiRequest} from '../../utils/apiRequest';
import {METHODS, ENDPOINTS} from '../../hooks';
const userId = 'ba5c33df-0c92-4324-19c7-08d8778cb545';

export const createGetDriversRides = async dispatch => {
  try {
    dispatch({type: DriverActions.GET_DRIVERS_RIDES_LOADING});
    const response = await apiRequest(
      METHODS.GET,
      ENDPOINTS.GET_DRIVERS_RIDES(userId),
    );
    dispatch({
      type: DriverActions.GET_DRIVERS_RIDES_SUCCESS,
      payload: [...response],
    });
  } catch (err) {
    dispatch({type: DriverActions.GET_DRIVERS_RIDES_ERROR, payload: err});
  }
};

export const createGetDriversPastRides = async dispatch => {
  try {
    dispatch({type: DriverActions.GET_DRIVERS_PAST_RIDES_LOADING});
    const response = await apiRequest(
      METHODS.GET,
      ENDPOINTS.GET_DRIVERS_PAST_RIDES(userId),
    );
    dispatch({
      type: DriverActions.GET_DRIVERS_PAST_RIDES_SUCCESS,
      payload: [...response],
    });
  } catch (err) {
    dispatch({type: DriverActions.GET_DRIVERS_PAST_RIDES_ERROR, payload: err});
  }
};

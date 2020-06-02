import {DriverActions} from '.';
import {apiRequest} from '../../utils/apiRequest';
import {METHODS, ENDPOINTS} from '../../hooks';
const userId = '8151a9b2-52ee-4ce0-a2dd-08d7f7744d91';

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

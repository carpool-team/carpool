import * as actions from '../../actions/driver';
import {initialStoreItem} from '../utils';

const initialState = {
  driversRides: initialStoreItem,
  driversPastRides: initialStoreItem,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GetDriversRides.Success:
      return {
        ...state,
        driversRides: {
          ...initialStoreItem,
          data: action.payload,
        },
      };
    case actions.GetDriversRides.Error:
      return {
        ...state,
        driversRides: {
          ...initialStoreItem,
          error: action.payload,
        },
      };
    case actions.GetDriversRides.Loading:
      return {
        ...state,
        driversRides: {
          ...state.driversRides,
          loading: true,
        },
      };
    case actions.GetDriversPastRides.Success:
      return {
        ...state,
        driversPastRides: {
          ...initialStoreItem,
          data: actions.payload,
        },
      };
    case actions.GetDriversPastRides.Error:
      return {
        ...state,
        driversPastRides: {
          ...initialStoreItem,
          error: action.payload,
        },
      };
    case actions.GetDriversPastRides.Loading:
      return {
        ...state,
        driversPastRides: {
          ...state.driversPastRides,
          loading: true,
        },
      };
    default:
      return state;
  }
};

export default reducer;

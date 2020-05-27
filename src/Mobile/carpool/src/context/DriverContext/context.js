import React, {createContext, useReducer} from 'react';

const initialState = {
  driversRides: {
    data: [],
    loading: false,
    error: null,
  },
};

export const DriverActions = {
  GET_DRIVERS_RIDES_SUCCESS: 'GET_DRIVERS_RIDES_SUCCESS',
  GET_DRIVERS_RIDES_LOADING: 'GET_DRIVERS_RIDES_LOADING',
  GET_DRIVERS_RIDES_ERROR: 'GET_DRIVERS_RIDES_ERROR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case DriverActions.GET_DRIVERS_RIDES_SUCCESS:
      return {
        ...state,
        driversRides: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case DriverActions.GET_DRIVERS_RIDES_LOADING:
      return {
        ...state,
        driversRides: {
          ...state.driversRides,
          loading: true,
        },
      };
    case DriverActions.GET_DRIVERS_RIDES_ERROR:
      return {
        ...state,
        driversRides: {
          data: [],
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export const DriverContext = createContext();

export const DriverStore = props => {
  const [driverState, dispatch] = useReducer(reducer, initialState);

  return (
    <DriverContext.Provider value={{driverState, dispatch}}>
      {props.children}
    </DriverContext.Provider>
  );
};

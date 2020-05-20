import React, {createContext, useReducer} from 'react';

const initialState = {
  allRides: {
    data: [],
    loading: false,
    error: null,
  },
  userRides: {
    data: [],
    loading: false,
    error: null,
  },
};

export const PassengerActions = {
  GET_ALL_RIDES_SUCCESS: 'GET_ALL_RIDES_SUCCESS',
  GET_ALL_RIDES_LOADING: 'GET_ALL_RIDES_LOADING',
  GET_ALL_RIDES_ERROR: 'GET_ALL_RIDES_ERROR',
  GET_USER_RIDES_SUCCESS: 'GET_USER_RIDES_SUCCESS',
  GET_USER_RIDES_LOADING: 'GET_USER_RIDES_LOADING',
  GET_USER_RIDES_ERROR: 'GET_USER_RIDES_ERROR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case PassengerActions.GET_ALL_RIDES_SUCCESS:
      return {
        ...state,
        allRides: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case PassengerActions.GET_ALL_RIDES_LOADING:
      return {
        ...state,
        allRides: {
          ...state.allRides,
          loading: true,
        },
      };
    case PassengerActions.GET_ALL_RIDES_ERROR:
      return {
        ...state,
        allRides: {
          ...state.allRides,
          loading: false,
          error: action.payload,
        },
      };
    case PassengerActions.GET_USER_RIDES_SUCCESS:
      return {
        ...state,
        userRides: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case PassengerActions.GET_USER_RIDES_LOADING:
      return {
        ...state,
        userRides: {
          ...state.userRides,
          loading: true,
        },
      };
    case PassengerActions.GET_USER_RIDES_ERROR:
      return {
        ...state,
        userRides: {
          ...state.userRides,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export const PassengerContext = createContext();

export const PassengerStore = props => {
  const [passengerState, dispatch] = useReducer(reducer, initialState);

  return (
    <PassengerContext.Provider value={{passengerState, dispatch}}>
      {props.children}
    </PassengerContext.Provider>
  );
};

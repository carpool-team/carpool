import React, {createContext, useReducer} from 'react';

const initialState = {
  location: null,
  date: null,
  group: null,
  swap: null,
  days: null,
  regular: false,
  time: null,
};

export const AddRideContextActions = {
  SET_LOCATION: 'SET_LOCATION',
  SET_DATE: 'SET_DATE',
  SET_GROUP: 'SET_GROUP',
  SET_SWAP: 'SET_SWAP',
  SET_DAYS: 'SET_DAYS',
  SET_REGULAR: 'SET_REGULAR',
  SET_TIME: 'SET_TIME',
  CLEAN_STATE: 'CLEAN_STATE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case AddRideContextActions.SET_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case AddRideContextActions.SET_SWAP:
      return {
        ...state,
        swap: action.payload,
      };
    case AddRideContextActions.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case AddRideContextActions.SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case AddRideContextActions.SET_DAYS:
      return {
        ...state,
        days: action.payload,
      };
    case AddRideContextActions.SET_REGULAR:
      return {
        ...state,
        regular: action.payload,
      };
    case AddRideContextActions.SET_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case AddRideContextActions.CLEAN_STATE:
      return initialState;
    default:
      return state;
  }
};

export const AddRideContext = createContext();

export const AddRideStore = props => {
  const [addRideState, dispatch] = useReducer(reducer, initialState);

  return (
    <AddRideContext.Provider value={{addRideState, dispatch}}>
      {props.children}
    </AddRideContext.Provider>
  );
};

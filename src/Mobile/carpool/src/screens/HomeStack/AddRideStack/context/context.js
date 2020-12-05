import React, {createContext, useReducer} from 'react';

const initialState = {
  startingLocation: null,
  date: null,
  group: null,
  swap: null,
};

export const AddRideContextActions = {
  SET_STARTING_LOCATION: 'SET_STARTING_LOCATION',
  SET_DATE: 'SET_DATE',
  SET_GROUP: 'SET_GROUP',
  SET_SWAP: 'SET_SWAP',
  CLEAN_STATE: 'CLEAN_STATE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case AddRideContextActions.SET_STARTING_LOCATION:
      return {
        ...state,
        startingLocation: action.payload,
      };
    case AddRideContextActions.SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
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

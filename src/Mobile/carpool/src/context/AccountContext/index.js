import React, {createContext, useContext, useReducer} from 'react';

const initialState = {
  activeAccount: 'passenger',
};

export const AccountActions = {
  TOGGLE_ACTIVE_ACCOUNT: 'TOGGLE_ACTIVE_ACCOUNT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case AccountActions.TOGGLE_ACTIVE_ACCOUNT:
      return toggleActive(state);
    default:
      return state;
  }
};

const toggleActive = state => {
  if (state.activeAccount === 'driver') {
    return {
      ...state,
      activeAccount: 'passenger',
    };
  } else {
    return {
      ...state,
      activeAccount: 'driver',
    };
  }
};

export const AccountContext = createContext();

export const AccountStore = props => {
  const [accountState, dispatch] = useReducer(reducer, initialState);

  return (
    <AccountContext.Provider value={{accountState, dispatch}}>
      {props.children}
    </AccountContext.Provider>
  );
};

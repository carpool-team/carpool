import React, {createContext, useReducer} from 'react';

const initialState = {
  activeAccount: 'passenger',
  groups: {
    data: [],
    loading: false,
    error: null,
  },
};

export const AccountActions = {
  TOGGLE_ACTIVE_ACCOUNT: 'TOGGLE_ACTIVE_ACCOUNT',
  GET_GROUPS_SUCCESS: 'GET_GROUPS_SUCCESS',
  GET_GROUPS_LOADING: 'GET_GROUPS_LOADING',
  GET_GROUPS_ERROR: 'GET_GROUPS_ERROR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case AccountActions.TOGGLE_ACTIVE_ACCOUNT:
      return toggleActive(state);
    case AccountActions.GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case AccountActions.GET_GROUPS_LOADING:
      return {
        ...state,
        groups: {
          ...state.groups,
          loading: true,
        },
      };
    case AccountActions.GET_GROUPS_ERROR:
      return {
        ...state,
        groups: {
          data: [],
          loading: false,
          error: action.payload,
        },
      };
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

import React, {createContext, useReducer} from 'react';
import {apiRequest} from '../../utils/apiRequest';
import {METHODS, ENDPOINTS} from '../../hooks';
const userId = '8151a9b2-52ee-4ce0-a2dd-08d7f7744d91';

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

export const createGetUserGroups = async dispatch => {
  try {
    dispatch({type: AccountActions.GET_GROUPS_LOADING});
    const response = await apiRequest(
      METHODS.GET,
      ENDPOINTS.GET_USER_GROUPS(userId),
    );
    dispatch({
      type: AccountActions.GET_GROUPS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({type: AccountActions.GET_GROUPS_ERROR, payload: err});
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

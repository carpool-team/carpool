import React, {createContext, useReducer} from 'react';
import {apiRequest} from '../../utils/apiRequest';
import {METHODS, ENDPOINTS} from '../../hooks';
const userId = 'ba5c33df-0c92-4324-19c7-08d8778cb545';

const initialState = {
  groups: {
    data: [],
    loading: false,
    error: null,
  },
  invitations: {
    data: [],
    loading: false,
    error: null,
  },
};

export const AccountActions = {
  GET_GROUPS_SUCCESS: 'GET_GROUPS_SUCCESS',
  GET_GROUPS_LOADING: 'GET_GROUPS_LOADING',
  GET_GROUPS_ERROR: 'GET_GROUPS_ERROR',
  GET_INVITATIONS_SUCCESS: 'GET_INVITATIONS_SUCCESS',
  GET_INVITATIONS_LOADING: 'GET_INVITATIONS_LOADING',
  GET_INVITATIONS_ERROR: 'GET_INVITATIONS_ERROR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case AccountActions.TOGGLE_ACTIVE_ACCOUNT:
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
    case AccountActions.GET_INVITATIONS_SUCCESS:
      return {
        ...state,
        invitations: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case AccountActions.GET_INVITATIONS_LOADING:
      return {
        ...state,
        invitations: {
          ...state.invitations,
          loading: true,
        },
      };
    case AccountActions.GET_INVITATIONS_ERROR:
      return {
        ...state,
        invitations: {
          data: [],
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
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

export const createGetUserInvitations = async dispatch => {
  try {
    dispatch({type: AccountActions.GET_INVITATIONS_LOADING});
    const response = await apiRequest(
      METHODS.GET,
      ENDPOINTS.GET_USER_INVITATIONS(userId),
    );
    dispatch({
      type: AccountActions.GET_INVITATIONS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({type: AccountActions.GET_INVITATIONS_ERROR, payload: err});
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

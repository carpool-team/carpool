import * as actions from '../../actions/account';
import {initialStoreItem} from '../utils';

const initialState = {
  activeAccount: 'passenger',
  groups: initialStoreItem,
  invitations: initialStoreItem,
  user: initialStoreItem,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ToggleActiveAccount.Trigger:
      return {
        ...state,
        activeAccount:
          state.activeAccount === 'passenger' ? 'driver' : 'passenger',
      };
    case actions.GetGroups.Success:
      return {
        ...state,
        groups: {
          ...initialStoreItem,
          data: action.payload,
        },
      };
    case actions.GetGroups.Error:
      return {
        ...state,
        groups: {
          ...initialStoreItem,
          error: action.payload,
        },
      };
    case actions.GetGroups.Loading:
      return {
        ...state,
        groups: {
          ...state.groups,
          loading: true,
        },
      };
    case actions.GetInvitations.Success:
      return {
        ...state,
        invitations: {
          ...initialStoreItem,
          data: action.payload,
        },
      };
    case actions.GetInvitations.Error:
      return {
        ...state,
        invitations: {
          ...initialStoreItem,
          error: action.payload,
        },
      };
    case actions.GetInvitations.Loading:
      return {
        ...state,
        invitations: {
          ...state.invitations,
          loading: true,
        },
      };
    case actions.GetUser.Success:
      return {
        ...state,
        user: {
          ...initialStoreItem,
          data: action.payload,
        },
      };
    case actions.GetUser.Error:
      return {
        ...state,
        user: {
          ...initialStoreItem,
          error: action.payload,
        },
      };
    case actions.GetUser.Loading:
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      };
    default:
      return state;
  }
};

export default reducer;

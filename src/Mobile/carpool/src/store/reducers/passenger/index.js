import * as actions from '../../actions/passenger';
import {initialStoreItem} from '../utils';

const initialState = {
  allRides: initialStoreItem,
  userRides: initialStoreItem,
  userPastRides: initialStoreItem,
  rideRequests: initialStoreItem,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GetUsersRides.Success:
      return {
        ...state,
        userRides: {
          ...initialStoreItem,
          data: action.payload,
        },
      };
    case actions.GetUsersRides.Error:
      return {
        ...state,
        userRides: {
          ...initialStoreItem,
          error: action.payload,
        },
      };
    case actions.GetUsersRides.Loading:
      return {
        ...state,
        userRides: {
          ...state.userRides,
          loading: true,
        },
      };
    case actions.GetUsersPastRides.Success:
      return {
        ...state,
        userPastRides: {
          ...initialStoreItem,
          data: action.payload,
        },
      };
    case actions.GetUsersPastRides.Error:
      return {
        ...state,
        userPastRides: {
          ...initialStoreItem,
          error: action.payload,
        },
      };
    case actions.GetUsersPastRides.Loading:
      return {
        ...state,
        userPastRides: {
          ...state.userPastRides,
          loading: true,
        },
      };
    case actions.GetPassengersRideRequests.Success:
      return {
        ...state,
        rideRequests: {
          ...initialStoreItem,
          data: action.payload,
        },
      };
    case actions.GetPassengersRideRequests.Error:
      return {
        ...state,
        rideRequests: {
          ...initialStoreItem,
          error: action.payload,
        },
      };
    case actions.GetPassengersRideRequests.Loading:
      return {
        ...state,
        rideRequests: {
          ...state.rideRequests,
          loading: true,
        },
      };
    default:
      return state;
  }
};

export default reducer;

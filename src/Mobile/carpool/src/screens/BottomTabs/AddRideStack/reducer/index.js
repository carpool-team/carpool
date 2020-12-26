export const initialState = {
  group: null,
  location: null,
  date: null,
  swap: null,
  days: null,
  regular: null,
  time: null,
  seats: null,
  success: false,
  error: null,
};

export const AddRideActions = {
  SET_LOCATION: 'SET_LOCATION',
  SET_DATE: 'SET_DATE',
  SET_GROUP: 'SET_GROUP',
  SET_SWAP: 'SET_SWAP',
  SET_DAYS: 'SET_DAYS',
  SET_REGULAR: 'SET_REGULAR',
  SET_TIME: 'SET_TIME',
  SET_SEATS: 'SET_SEATS',
  CLEAN_STATE: 'CLEAN_STATE',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_ERROR: 'SET_ERROR',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case AddRideActions.SET_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case AddRideActions.SET_SWAP:
      return {
        ...state,
        swap: action.payload,
      };
    case AddRideActions.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case AddRideActions.SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case AddRideActions.SET_DAYS:
      return {
        ...state,
        days: action.payload,
      };
    case AddRideActions.SET_REGULAR:
      return {
        ...state,
        regular: action.payload,
      };
    case AddRideActions.SET_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case AddRideActions.SET_SEATS:
      return {
        ...state,
        seats: action.payload,
      };
    case AddRideActions.SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case AddRideActions.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AddRideActions.CLEAN_STATE:
      return initialState;
    default:
      return state;
  }
};

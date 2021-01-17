export const initialState = {
  group: null,
  location: null,
  date: null,
  swap: null,
  period: null,
};

export const SearchActions = {
  SET_GROUP: 'SET_GROUP',
  SET_LOCATION: 'SET_LOCATION',
  SET_DATE: 'SET_DATE',
  SET_SWAP: 'SET_SWAP',
  SET_PERIOD: 'SET_PERIOD',
  CLEAN_STATE: 'CLEAN_STATE',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SearchActions.SET_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case SearchActions.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case SearchActions.SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case SearchActions.SET_SWAP:
      return {
        ...state,
        swap: action.payload,
      };
    case SearchActions.SET_PERIOD:
      return {
        ...state,
        period: action.payload,
      };
    case SearchActions.CLEAN_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

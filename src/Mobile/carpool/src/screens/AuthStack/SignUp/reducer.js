export const SignUpActions = {
  SET_FIRST_NAME: 'SET_FIRST_NAME',
  SET_LAST_NAME: 'SET_LAST_NAME',
  SET_EMAIL: 'SET_EMAIL',
  SET_PASSWORD: 'SET_PASSWORD',
  RESET: 'RESET',
};

export const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SignUpActions.SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload,
      };
    case SignUpActions.SET_LAST_NAME:
      return {
        ...state,
        lastName: action.payload,
      };
    case SignUpActions.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SignUpActions.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case SignUpActions.RESET:
      return initialState;
    default:
      return state;
  }
};

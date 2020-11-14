export const SignUpActions = {
  SET_FIRST_NAME: 'SET_FIRST_NAME',
  SET_LAST_NAME: 'SET_LAST_NAME',
  SET_EMAIL: 'SET_EMAIL',
  SET_PASSWORD: 'SET_PASSWORD',
};

export const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SignUpActions.SET_FIRST_NAME:
      return {
        ...state,
        first_name: action.payload,
      };
    case SignUpActions.SET_LAST_NAME:
      return {
        ...state,
        last_name: action.payload,
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
    default:
      return state;
  }
};

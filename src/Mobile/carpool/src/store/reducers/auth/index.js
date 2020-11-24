import * as actions from '../../actions/auth';
import {initialStoreItem} from '../utils';

const initialState = {
  tokens: initialStoreItem,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GetToken.Success:
      return {
        ...state,
        tokens: {
          ...initialStoreItem,
          data: action.payload,
        },
      };
    case actions.GetToken.Error:
      return {
        ...state,
        tokens: {
          ...initialStoreItem,
          error: action.payload,
        },
      };
    case actions.GetToken.Loading:
      return {
        ...state,
        tokens: {
          ...state.tokens,
          loading: true,
        },
      };
    default:
      return state;
  }
};

export default reducer;

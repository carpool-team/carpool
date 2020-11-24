import accountReducer from './account';
import driverReducer from './driver';
import passengerReducer from './passenger';
import authReducer from './auth';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  accountReducer,
  driverReducer,
  passengerReducer,
  authReducer,
});

export {rootReducer};

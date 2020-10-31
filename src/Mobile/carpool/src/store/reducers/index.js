import accountReducer from './account';
import driverReducer from './driver';
import passengerReducer from './passenger';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  accountReducer,
  driverReducer,
  passengerReducer,
});

export {rootReducer};

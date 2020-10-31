import accountReducer from './account';
import driverReducer from './driver';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  accountReducer,
  driverReducer,
});

export {rootReducer};

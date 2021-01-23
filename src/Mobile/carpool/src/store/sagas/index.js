import {all} from 'redux-saga/effects';
import account from './account';
import driver from './driver';
import passenger from './passenger';
import auth from './auth';

function* rootSaga() {
  yield all([...account, ...driver, ...passenger, ...auth]);
}

export default rootSaga;

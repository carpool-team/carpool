import {all} from 'redux-saga/effect';
import account from './account';
import driver from './driver';
import passenger from './passenger';

function* rootSaga() {
  yield all([...account, ...driver, ...passenger]);
}

export default rootSaga;

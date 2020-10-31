import {all} from 'redux-saga/effect';
import account from './account';
import driver from './driver';

function* rootSaga() {
  yield all([...account, ...driver]);
}

export default rootSaga;

import {takeLatest, put} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import {ENDPOINTS} from '../../../hooks';
const userId = 'ba5c33df-0c92-4324-19c7-08d8778cb545';

export function* getDriversRidesAsync() {
  try {
    const token = '123';

    if (token) {
      yield put(actions.getDriversRidesLoading());

      const res = yield instance.get(ENDPOINTS.GET_DRIVERS_RIDES(userId));

      console.log('RES', res);

      yield put(actions.getDriversRidesSuccess(res.data.result));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getDriversRidesError(err));
    console.log('ERROR', err);
  }
}

export function* getDriversPastRidesAsync() {
  try {
    const token = '123';

    if (token) {
      yield put(actions.getDriversPastRidesLoading());

      const res = yield instance.get(ENDPOINTS.GET_DRIVERS_PAST_RIDES(userId));

      console.log('RES', res);

      yield put(actions.getDriversPastRidesSuccess(res.data.result));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getDriversPastRidesError(err));
    console.log('ERROR', err);
  }
}

const accountSagas = [
  takeLatest(actions.GetDriversRides.Trigger, getDriversRidesAsync),
  takeLatest(actions.GetDriversPastRides.Trigger, getDriversPastRidesAsync),
];

export default accountSagas;

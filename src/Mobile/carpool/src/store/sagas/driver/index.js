import {takeLatest, put} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import {ENDPOINTS} from '../../../hooks';
const userId = '8151a9b2-52ee-4ce0-a2dd-08d7f7744d91';

export function* getDriversRidesAsync() {
  try {
    const token = '123';

    if (token) {
      yield put(actions.getDriversRidesLoading());

      const res = yield instance.get(ENDPOINTS.GET_DRIVERS_RIDES(userId));

      console.log('RES', res);

      yield put(actions.getDriversRidesSuccess(res.data));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getDriversRidesError(err));
  }
}

export function* getDriversPastRidesAsync() {
  try {
    const token = '123';

    if (token) {
      yield put(actions.getDriversPastRidesLoading());

      const res = yield instance.get(ENDPOINTS.GET_DRIVERS_RIDES(userId));

      console.log('RES', res);

      yield put(actions.getDriversPastRidesSuccess(res.data));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getDriversPastRidesError(err));
  }
}

const accountSagas = [
  takeLatest(actions.GetDriversRides.Trigger, getDriversRidesAsync),
  takeLatest(actions.GetDriversPastRides.Trigger, getDriversPastRidesAsync),
];

export default accountSagas;

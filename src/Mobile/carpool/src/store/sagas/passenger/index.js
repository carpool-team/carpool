import {takeLatest, put} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import {ENDPOINTS} from '../../../hooks';
const userId = '8151a9b2-52ee-4ce0-a2dd-08d7f7744d91';

export function* getAllRidesAsync() {
  try {
    const token = '123';

    if (token) {
      yield put(actions.getAllRidesLoading());

      const res = yield instance.get(
        `${ENDPOINTS.GET_ALL_RIDES}?userId=${userId}`,
      );

      console.log('RES', res);

      yield put(actions.getAllRidesSuccess(res.data.result));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getAllRidesError(err));
    console.log('ERROR', err);
  }
}

export function* getUsersRidesAsync() {
  try {
    const token = '123';

    if (token) {
      yield put(actions.getUsersRidesLoading());

      const res = yield instance.get(ENDPOINTS.GET_USERS_RIDES(userId));

      console.log('RES', res);

      yield put(actions.getUsersRidesSuccess(res.data.result));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getUsersRidesError(err));
    console.log('ERROR', err);
  }
}

const passengerActions = [
  takeLatest(actions.GetAllRides.Trigger, getAllRidesAsync),
  takeLatest(actions.GetUsersRides.Trigger, getUsersRidesAsync),
];

export default passengerActions;

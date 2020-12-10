import {takeLatest, put, select, take} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import jwt_decode from 'jwt-decode';

export function* getAllRidesAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getAllRidesLoading());

      // const res = yield instance.get(
      //   `${ENDPOINTS.GET_ALL_RIDES}?userId=${userId}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );

      // console.log('RES', res);

      // yield put(actions.getAllRidesSuccess(res.data.result));
      yield put(actions.getAllRidesSuccess([]));
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        yield put(actions.getAllRides());
        return;
      }
    }
    yield put(actions.getAllRidesError(err));
  }
}

export function* getUsersRidesAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getUsersRidesLoading());

      const res = yield instance.get(
        `/users/${userId}/rides?participated=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getUsersRidesSuccess(res.data.result));
      // yield put(actions.getUsersRidesSuccess(exampleRides));
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        yield put(actions.getUsersRides());
        return;
      }
    }
    yield put(actions.getUsersRidesError(err));
  }
}

export function* getUsersPastRidesAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getUsersPastRidesLoading());

      const res = yield instance.get(
        `/users/${userId}/rides?past=true&participated=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getUsersPastRidesSuccess(res.data.result));
      // yield put(actions.getUsersPastRidesSuccess(examplePastRides));
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        yield put(actions.getUsersPastRides());
        return;
      }
    }
    yield put(actions.getUsersPastRidesError(err));
  }
}

const passengerActions = [
  takeLatest(actions.GetAllRides.Trigger, getAllRidesAsync),
  takeLatest(actions.GetUsersRides.Trigger, getUsersRidesAsync),
  takeLatest(actions.GetUsersPastRides.Trigger, getUsersPastRidesAsync),
];

export default passengerActions;

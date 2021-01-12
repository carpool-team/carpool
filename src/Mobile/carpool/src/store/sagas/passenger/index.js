import {
  takeLatest,
  put,
  select,
  take,
  delay,
  call,
  putResolve,
} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import jwt_decode from 'jwt-decode';
import {readData, STORAGE_KEYS} from '../../../storage';
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from '@adobe/redux-saga-promise';

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

export function* getPassengersRideRequestsAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getPassengersRideRequestsLoading());

      const res = yield instance.get('/RideRequests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getPassengersRideRequestsSuccess(res.data.result));
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        yield put(actions.getPassengersRideRequests());
        return;
      }
    }
    yield put(actions.getPassengersRideRequestsError(err));
  }
}

export function* watchPassengersRideRequestsAsync() {
  while (true) {
    const token = yield call(readData, STORAGE_KEYS.token);

    if (token) {
      yield put(actions.getPassengersRideRequests());
    }

    // Every 5 minutes
    yield delay(300000);
  }
}

export function* createRideRequestAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      const res = yield instance.post(
        '/RideRequests',
        {
          ...action.payload,
          requestingUserId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getPassengersRideRequests());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.createRideRequest(action.payload));
          yield call(resolvePromiseAction, action);
        } catch (err) {
          yield call(rejectPromiseAction, action, err.response);
        }
        return;
      }
      yield call(rejectPromiseAction, action, err.response);
    }
    yield call(rejectPromiseAction, action, err.response);
  }
}

export function* findRidesAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      const {groupId, rideDirection, dateTime} = action.payload;
      const endpoint = `/Rides?groupId=${groupId}&rideDirection=${rideDirection}&dateTime=${dateTime}`;

      const res = yield instance.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield call(resolvePromiseAction, action, res.data.result);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.findRides(action.payload));
          yield call(resolvePromiseAction, action);
        } catch (err) {
          yield call(rejectPromiseAction, action, err.response);
        }
        return;
      }
      yield call(rejectPromiseAction, action, err.response);
    }
    yield call(rejectPromiseAction, action, err.response);
  }
}

export function* resignFromRideAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      const res = yield instance.delete(
        `/Rides/${action.payload}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getUsersRides());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.resignFromRide(action.payload));
          yield call(resolvePromiseAction, action);
        } catch (err) {
          yield call(rejectPromiseAction, action, err.response);
        }
        return;
      }
    }
    yield call(rejectPromiseAction, action, err.response);
  }
}

export function* deleteRideRequestAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);

    if (token) {
      yield instance.delete(`/RideRequests/${action.payload}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getPassengersRideRequests());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.deleteRideRequest(action.payload));
          yield call(resolvePromiseAction, action);
        } catch (err) {
          yield call(rejectPromiseAction, action, err.response);
        }
        return;
      }
    }
    yield call(rejectPromiseAction, action, err.response);
  }
}

const passengerSagas = [
  takeLatest(actions.GetUsersRides.Trigger, getUsersRidesAsync),
  takeLatest(actions.GetUsersPastRides.Trigger, getUsersPastRidesAsync),
  takeLatest(
    actions.GetPassengersRideRequests.Trigger,
    getPassengersRideRequestsAsync,
  ),
  takeLatest(
    actions.GetPassengersRideRequests.Watch,
    watchPassengersRideRequestsAsync,
  ),
  takeLatest(actions.CreateRideRequest.PromiseTrigger, createRideRequestAsync),
  takeLatest(actions.FindRides.PromiseTrigger, findRidesAsync),
  takeLatest(actions.ResignFromRide.PromiseTrigger, resignFromRideAsync),
  takeLatest(actions.DeleteRideRequest.PromiseTrigger, deleteRideRequestAsync),
];

export default passengerSagas;

import {
  takeLatest,
  put,
  select,
  call,
  putResolve,
  take,
  delay,
} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from '@adobe/redux-saga-promise';
import {readData, STORAGE_KEYS} from '../../../storage';

export function* getDriversRidesAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getDriversRidesLoading());

      const res = yield instance.get(`/users/${userId}/rides?owned=true`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getDriversRidesSuccess(res.data.result));
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        yield put(actions.getDriversRides());
        return;
      }
    }
    yield put(actions.getDriversRidesError(err));
  }
}

export function* getDriversPastRidesAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getDriversPastRidesLoading());

      const res = yield instance.get(
        `/users/${userId}/rides?past=true&owned=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getDriversPastRidesSuccess(res.data.result));
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        yield put(actions.getDriversPastRides());
        return;
      }
    }
    yield put(actions.getDriversPastRidesError(err));
  }
}

export function* deleteRideAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);

    if (token) {
      yield instance.delete(`/Rides/${action.payload}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getDriversRides());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.deleteRide(action.payload));
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

export function* deleteRegularRideAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);

    if (token) {
      yield instance.delete(`/Rides/recurring/${action.payload}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getDriversRides());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.deleteRegularRide(action.payload));
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

export function* deleteParticipantAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);

    if (token) {
      const {rideId, userId} = action.payload;

      yield instance.delete(`/Rides/${rideId}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getDriversRides());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.deleteParticipant(action.payload));
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

export function* createSingleRideAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield instance.post(
        '/Rides',
        {
          ...action.payload,
          ownerId: userId,
          price: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getDriversRides());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.createSingleRide(action.payload));
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

export function* createRegularRideAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    const startDate = moment().format();

    const endDate = moment()
      .set('hours', 0)
      .set('minutes', 0)
      .set('seconds', 0)
      .add(action.payload.weeks, 'weeks')
      .format();

    if (token) {
      const res = yield instance.post(
        '/Rides/recurring',
        {
          ...action.payload,
          ownerId: userId,
          price: 0,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getDriversRides());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.createRegularRide(action.payload));
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

export function* getDriversRideRequestsAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);

    if (token) {
      yield put(actions.getDriversRideRequestsLoading());

      const res = yield instance.get('/RideRequests?isOwner=true', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getDriversRideRequestsSuccess(res.data.result));
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        yield put(actions.getDriversRideRequests());
        return;
      }
    }
    yield put(actions.getDriversRideRequestsError(err));
  }
}

export function* watchDriversRideRequestsAsync() {
  while (true) {
    const token = yield call(readData, STORAGE_KEYS.token);

    if (token) {
      yield put(actions.getDriversRideRequests());
    }

    // Every 5 minutes
    yield delay(300000);
  }
}

export function* acceptRideRequestAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);

    if (token) {
      yield instance.put(
        '/RideRequests',
        {
          isAccepted: true,
          rideRequestId: action.payload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getDriversRideRequests());
      yield put(actions.getDriversRides());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.acceptRideRequest(action.payload));
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

export function* rejectRideRequestAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);

    if (token) {
      yield instance.put(
        '/RideRequests',
        {
          isAccepted: false,
          rideRequestId: action.payload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getDriversRideRequests());
      yield put(actions.getDriversRides());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.rejectRideRequest(action.payload));
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

const driverSagas = [
  takeLatest(actions.GetDriversRides.Trigger, getDriversRidesAsync),
  takeLatest(actions.GetDriversPastRides.Trigger, getDriversPastRidesAsync),
  takeLatest(actions.DeleteRide.PromiseTrigger, deleteRideAsync),
  takeLatest(actions.DeleteParticipant.PromiseTrigger, deleteParticipantAsync),
  takeLatest(actions.CreateSingleRide.PromiseTrigger, createSingleRideAsync),
  takeLatest(actions.CreateRegularRide.PromiseTrigger, createRegularRideAsync),
  takeLatest(
    actions.GetDriversRideRequests.Trigger,
    getDriversRideRequestsAsync,
  ),
  takeLatest(
    actions.GetDriversRideRequests.Watch,
    watchDriversRideRequestsAsync,
  ),
  takeLatest(actions.AcceptRideRequest.PromiseTrigger, acceptRideRequestAsync),
  takeLatest(actions.RejectRideRequest.PromiseTrigger, rejectRideRequestAsync),
  takeLatest(actions.DeleteRegularRide.PromiseTrigger, deleteRegularRideAsync),
];

export default driverSagas;

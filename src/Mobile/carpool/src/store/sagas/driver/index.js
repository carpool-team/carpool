import {takeLatest, put, select, call} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import {ENDPOINTS} from '../../../hooks';
import faker from 'faker';
const userId = 'ba5c33df-0c92-4324-19c7-08d8778cb545';
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from '@adobe/redux-saga-promise';

const exampleRides = [
  {
    id: faker.random.alphaNumeric(32),
    date: moment()
      .add(1, 'hours')
      .format(),
    startingLocation: {
      coordinates: {
        latitude: 52.40656926303501,
        longitude: 16.86633729745128,
      },
    },
    destination: {
      coordinates: {
        latitude: 53.30656926303501,
        longitude: 16.76633729745128,
      },
    },
    participants: [
      {
        id: faker.random.alphaNumeric(32),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
    ],
    stops: [
      {
        coordinates: {
          latitude: 52.55188,
          longitude: 16.838128,
        },
        user: {
          id: faker.random.alphaNumeric(32),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      },
    ],
  },
  {
    id: faker.random.alphaNumeric(32),
    date: moment()
      .add(1, 'hours')
      .format(),
    startingLocation: {
      coordinates: {
        latitude: 52.40656926303501,
        longitude: 16.86633729745128,
      },
    },
    destination: {
      coordinates: {
        latitude: 53.30656926303501,
        longitude: 16.76633729745128,
      },
    },
    participants: [
      {
        id: faker.random.alphaNumeric(32),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
    ],
    stops: [
      {
        coordinates: {
          latitude: 52.55188,
          longitude: 16.838128,
        },
        user: {
          id: faker.random.alphaNumeric(32),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      },
    ],
  },
  {
    id: faker.random.alphaNumeric(32),
    date: moment()
      .add(1, 'days')
      .format(),
    startingLocation: {
      coordinates: {
        latitude: 52.40656926303501,
        longitude: 16.86633729745128,
      },
    },
    destination: {
      coordinates: {
        latitude: 53.30656926303501,
        longitude: 16.76633729745128,
      },
    },
    participants: [
      {
        id: faker.random.alphaNumeric(32),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
    ],
    stops: [
      {
        coordinates: {
          latitude: 52.55188,
          longitude: 16.838128,
        },
        user: {
          id: faker.random.alphaNumeric(32),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      },
    ],
  },
  {
    id: faker.random.alphaNumeric(32),
    date: moment()
      .add(1, 'days')
      .format(),
    startingLocation: {
      coordinates: {
        latitude: 52.40656926303501,
        longitude: 16.86633729745128,
      },
    },
    destination: {
      coordinates: {
        latitude: 53.30656926303501,
        longitude: 16.76633729745128,
      },
    },
    participants: [
      {
        id: faker.random.alphaNumeric(32),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
    ],
    stops: [
      {
        coordinates: {
          latitude: 52.55188,
          longitude: 16.838128,
        },
        user: {
          id: faker.random.alphaNumeric(32),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      },
    ],
  },
  {
    id: faker.random.alphaNumeric(32),
    date: moment()
      .add(2, 'days')
      .format(),
    startingLocation: {
      coordinates: {
        latitude: 52.40656926303501,
        longitude: 16.86633729745128,
      },
    },
    destination: {
      coordinates: {
        latitude: 53.30656926303501,
        longitude: 16.76633729745128,
      },
    },
    participants: [
      {
        id: faker.random.alphaNumeric(32),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
    ],
    stops: [
      {
        coordinates: {
          latitude: 52.55188,
          longitude: 16.838128,
        },
        user: {
          id: faker.random.alphaNumeric(32),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      },
    ],
  },
  {
    id: faker.random.alphaNumeric(32),
    date: moment()
      .add(3, 'days')
      .format(),
    startingLocation: {
      coordinates: {
        latitude: 52.40656926303501,
        longitude: 16.86633729745128,
      },
    },
    destination: {
      coordinates: {
        latitude: 53.30656926303501,
        longitude: 16.76633729745128,
      },
    },
    participants: [
      {
        id: faker.random.alphaNumeric(32),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
    ],
    stops: [
      {
        coordinates: {
          latitude: 52.55188,
          longitude: 16.838128,
        },
        user: {
          id: faker.random.alphaNumeric(32),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      },
    ],
  },
];

const examplePastRides = [
  {
    id: faker.random.alphaNumeric(32),
    date: new Date(faker.date.past()).toISOString(),
    startingLocation: {
      coordinates: {
        latitude: 52.40656926303501,
        longitude: 16.86633729745128,
      },
    },
    destination: {
      coordinates: {
        latitude: 53.30656926303501,
        longitude: 16.76633729745128,
      },
    },
    participants: [
      {
        id: faker.random.alphaNumeric(32),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
    ],
    stops: [
      {
        coordinates: {
          latitude: 52.55188,
          longitude: 16.838128,
        },
        user: {
          id: faker.random.alphaNumeric(32),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      },
    ],
  },
  {
    id: faker.random.alphaNumeric(32),
    date: new Date(faker.date.past()).toISOString(),
    startingLocation: {
      coordinates: {
        latitude: 52.40656926303501,
        longitude: 16.86633729745128,
      },
    },
    destination: {
      coordinates: {
        latitude: 53.30656926303501,
        longitude: 16.76633729745128,
      },
    },
    participants: [
      {
        id: faker.random.alphaNumeric(32),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
    ],
    stops: [
      {
        coordinates: {
          latitude: 52.55188,
          longitude: 16.838128,
        },
        user: {
          id: faker.random.alphaNumeric(32),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      },
    ],
  },
  {
    id: faker.random.alphaNumeric(32),
    date: new Date(faker.date.past()).toISOString(),
    startingLocation: {
      coordinates: {
        latitude: 52.40656926303501,
        longitude: 16.86633729745128,
      },
    },
    destination: {
      coordinates: {
        latitude: 53.30656926303501,
        longitude: 16.76633729745128,
      },
    },
    participants: [
      {
        id: faker.random.alphaNumeric(32),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
    ],
    stops: [
      {
        coordinates: {
          latitude: 52.55188,
          longitude: 16.838128,
        },
        user: {
          id: faker.random.alphaNumeric(32),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      },
    ],
  },
];

export function* getDriversRidesAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getDriversRidesLoading());

      // const res = yield instance.get(`/users/${userId}/rides`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // console.log('RES', res);

      // yield put(actions.getDriversRidesSuccess(res.data.result));
      yield put(actions.getDriversRidesSuccess(exampleRides));
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
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getDriversPastRidesLoading());

      // const res = yield instance.get(`/users/${userId}/rides`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // console.log('RES', res);

      // yield put(actions.getDriversPastRidesSuccess(res.data.result));
      yield put(actions.getDriversPastRidesSuccess(examplePastRides));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getDriversPastRidesError(err));
    console.log('ERROR', err);
  }
}

export function* deleteRideAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      // yield instance.delete(`/Rides/${action.payload}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      yield put(actions.getDriversRides());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    console.log('ERR', err);
    yield call(rejectPromiseAction, action, err);
  }
}

export function* deleteParticipantAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      const {rideId, userId} = action.payload;
      // yield instance.delete(`/Rides/${rideId}/users/${userId}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      yield put(actions.getDriversRides());

      console.log('DELETE PARTICIPANT', action.payload);

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    console.log('ERR', err);
    yield call(rejectPromiseAction, action, err);
  }
}

export function* createSingleRideAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      // send request
      console.log('CREATE SINGLE RIDE', action.payload);

      yield put(actions.getDriversRides());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    console.log('ERR', err);
    yield call(rejectPromiseAction, action, err);
  }
}

export function* createRegularRideAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      // send request
      console.log('CREATE REGULAR RIDE', action.payload);

      yield put(actions.getDriversRides());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    console.log('ERR', err);
    yield call(rejectPromiseAction, action, err);
  }
}

const accountSagas = [
  takeLatest(actions.GetDriversRides.Trigger, getDriversRidesAsync),
  takeLatest(actions.GetDriversPastRides.Trigger, getDriversPastRidesAsync),
  takeLatest(actions.DeleteRide.PromiseTrigger, deleteRideAsync),
  takeLatest(actions.DeleteParticipant.PromiseTrigger, deleteParticipantAsync),
  takeLatest(actions.CreateSingleRide.PromiseTrigger, createSingleRideAsync),
  takeLatest(actions.CreateRegularRide.PromiseTrigger, createRegularRideAsync),
];

export default accountSagas;

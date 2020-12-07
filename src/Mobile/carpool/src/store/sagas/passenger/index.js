import {takeLatest, put, select} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import {ENDPOINTS} from '../../../hooks';
const userId = 'ba5c33df-0c92-4324-19c7-08d8778cb545';
import faker from 'faker';
import moment from 'moment';
import jwt_decode from 'jwt-decode';

const exampleRides = [
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
          latitude: 52.807428,
          longitude: 17.208917,
        },
        user: {
          id: faker.random.alphaNumeric(32),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      },
    ],
    owner: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
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
    owner: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
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
    owner: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: faker.random.alphaNumeric(32),
    date: moment()
      .add(4, 'days')
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
    owner: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  },
  {
    id: faker.random.alphaNumeric(32),
    date: moment()
      .add(5, 'days')
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
    owner: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
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
];

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
      yield put(actions.getAllRidesSuccess(exampleRides));
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
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getUsersRidesLoading());

      // const res = yield instance.get(`/users/${userId}/rides`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // console.log('RES', res);

      // yield put(actions.getUsersRidesSuccess(res.data.result));
      yield put(actions.getUsersRidesSuccess(exampleRides));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getUsersRidesError(err));
    console.log('ERROR', err);
  }
}

export function* getUsersPastRidesAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getUsersPastRidesLoading());

      // const res = yield instance.get(`/users/${userId}/rides`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // console.log('RES', res);

      // yield put(actions.getUsersRidesSuccess(res.data.result));
      yield put(actions.getUsersPastRidesSuccess(examplePastRides));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getUsersPastRidesError(err));
    console.log('ERROR', err);
  }
}

const passengerActions = [
  takeLatest(actions.GetAllRides.Trigger, getAllRidesAsync),
  takeLatest(actions.GetUsersRides.Trigger, getUsersRidesAsync),
  takeLatest(actions.GetUsersPastRides.Trigger, getUsersPastRidesAsync),
];

export default passengerActions;

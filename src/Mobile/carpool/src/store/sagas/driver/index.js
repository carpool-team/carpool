import {takeLatest, put} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import {ENDPOINTS} from '../../../hooks';
import faker from 'faker';
const userId = 'ba5c33df-0c92-4324-19c7-08d8778cb545';
import moment from 'moment';

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
      },
    ],
  },
];

export function* getDriversRidesAsync() {
  try {
    const token = '123';

    if (token) {
      yield put(actions.getDriversRidesLoading());

      // const res = yield instance.get(ENDPOINTS.GET_DRIVERS_RIDES(userId));

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
    const token = '123';

    if (token) {
      yield put(actions.getDriversPastRidesLoading());

      // const res = yield instance.get(ENDPOINTS.GET_DRIVERS_PAST_RIDES(userId));

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

const accountSagas = [
  takeLatest(actions.GetDriversRides.Trigger, getDriversRidesAsync),
  takeLatest(actions.GetDriversPastRides.Trigger, getDriversPastRidesAsync),
];

export default accountSagas;

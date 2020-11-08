import {takeLatest, put} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import {ENDPOINTS} from '../../../hooks';
const userId = 'ba5c33df-0c92-4324-19c7-08d8778cb545';
import faker from 'faker';

const exampleGroups = [
  {
    id: faker.random.alphaNumeric(32),
    location: {
      latitude: 52.40656926303501,
      longitude: 16.86633729745128,
    },
    name: faker.random.word(),
    rideCount: faker.random.number({min: 0, max: 100}),
    userCount: faker.random.number({min: 10, max: 1000}),
  },
  {
    id: faker.random.alphaNumeric(32),
    location: {
      latitude: 52.40656926303501,
      longitude: 16.86633729745128,
    },
    name: faker.random.word(),
    rideCount: faker.random.number({min: 0, max: 100}),
    userCount: faker.random.number({min: 10, max: 1000}),
  },
  {
    id: faker.random.alphaNumeric(32),
    location: {
      latitude: 52.40656926303501,
      longitude: 16.86633729745128,
    },
    name: faker.random.word(),
    rideCount: faker.random.number({min: 0, max: 100}),
    userCount: faker.random.number({min: 10, max: 1000}),
  },
  {
    id: faker.random.alphaNumeric(32),
    location: {
      latitude: 52.40656926303501,
      longitude: 16.86633729745128,
    },
    name: faker.random.word(),
    rideCount: faker.random.number({min: 0, max: 100}),
    userCount: faker.random.number({min: 10, max: 1000}),
  },
];

export function* getGroupsAsync() {
  try {
    const token = '123';

    if (token) {
      yield put(actions.getGroupsLoading());

      // const res = yield instance.get(ENDPOINTS.GET_USER_GROUPS(userId));
      const res = yield instance.get('/Groups');

      console.log('GROUPS RES', res);

      yield put(actions.getGroupsSuccess(res.data.result));
      // yield put(actions.getGroupsSuccess(exampleGroups));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getGroupsError(err));
    console.log('ERROR', err);
  }
}

const exampleInvitations = [
  {
    id: faker.random.alphaNumeric(32),
    group: {
      name: faker.random.word(),
      userCount: faker.random.number({min: 0, max: 100}),
    },
  },
  {
    id: faker.random.alphaNumeric(32),
    group: {
      name: faker.random.word(),
      userCount: faker.random.number({min: 0, max: 100}),
    },
  },
  {
    id: faker.random.alphaNumeric(32),
    group: {
      name: faker.random.word(),
      userCount: faker.random.number({min: 0, max: 100}),
    },
  },
];

export function* getInvitationsAsync() {
  try {
    const token = '123';

    if (token) {
      yield put(actions.getInvitationsLoading());

      // const res = yield instance.get(ENDPOINTS.GET_USER_INVITATIONS(userId));

      // console.log('RES', res);

      // yield put(actions.getInvitationsSuccess(res.data.result));
      yield put(actions.getInvitationsSuccess(exampleInvitations));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getInvitationsError(err));
    console.log('ERROR', err);
  }
}

const accountSagas = [
  takeLatest(actions.GetGroups.Trigger, getGroupsAsync),
  takeLatest(actions.GetInvitations.Trigger, getInvitationsAsync),
];

export default accountSagas;

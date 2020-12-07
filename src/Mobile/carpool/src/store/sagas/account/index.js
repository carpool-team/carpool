import {takeLatest, put, select, call, take} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import {ENDPOINTS} from '../../../hooks';
const userId = 'ba5c33df-0c92-4324-19c7-08d8778cb545';
import faker from 'faker';
import jwt_decode from 'jwt-decode';
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from '@adobe/redux-saga-promise';

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
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getGroupsLoading());

      const res = yield instance.get(`/users/${userId}/groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getGroupsSuccess(res.data.result));
    }
  } catch (err) {
    if (err.response.status === 401) {
      yield put(actions.refreshToken());
      yield take(actions.GetToken.Success);
      yield put(actions.getGroups());
      return;
    }
    yield put(actions.getGroupsError(err));
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
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getInvitationsLoading());

      // const res = yield instance.get(`/users/${userId}/group-invites`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

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

export function* acceptInvitationAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      console.log('ACCEPTING INVITATION', action.payload);

      // yield instance.put(`/GroupInvites/${action.payload}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      yield put(actions.getInvitations());
      yield put(actions.getGroups());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    console.log('ERR', err);
    yield call(rejectPromiseAction, action, err);
  }
}

export function* declineInvitationAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      console.log('DECLINING INVITATION', action.payload);

      // yield instance.put(`/GroupInvites/${action.payload}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      yield put(actions.getInvitations());
      yield put(actions.getGroups());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    console.log('ERR', err);
    yield call(rejectPromiseAction, action, err);
  }
}

const accountSagas = [
  takeLatest(actions.GetGroups.Trigger, getGroupsAsync),
  takeLatest(actions.GetInvitations.Trigger, getInvitationsAsync),
  takeLatest(actions.AcceptInvitation.PromiseTrigger, acceptInvitationAsync),
  takeLatest(actions.DeclineInvitation.PromiseTrigger, declineInvitationAsync),
];

export default accountSagas;

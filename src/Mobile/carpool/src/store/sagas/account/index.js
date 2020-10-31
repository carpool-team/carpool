import {takeLatest, put} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import {ENDPOINTS} from '../../../hooks';
const userId = '8151a9b2-52ee-4ce0-a2dd-08d7f7744d91';

export function* getGroupsAsync() {
  try {
    const token = '123';

    if (token) {
      yield put(actions.getGroupsLoading());

      const res = yield instance.get(ENDPOINTS.GET_USER_GROUPS(userId));

      console.log('RES', res);

      yield put(actions.getGroupsSuccess(res.data));
    }
  } catch (err) {
    // TODO
    // Token refreshing
    yield put(actions.getGroupsError(err));
    console.log('ERROR', err);
  }
}

export function* getInvitationsAsync() {
  try {
    const token = '123';

    if (token) {
      yield put(actions.getInvitationsLoading());

      const res = yield instance.get(ENDPOINTS.GET_USER_INVITATIONS(userId));

      console.log('RES', res);

      yield put(actions.getInvitationsSuccess(res.data));
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

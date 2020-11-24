import {takeLatest, put, call} from 'redux-saga/effects';
import * as actions from '../../actions/auth';
import axiosInstance from '../../../axios/authInstance';
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from '@adobe/redux-saga-promise';
import authInstance from '../../../axios/authInstance';
import {STORAGE_KEYS, storeData} from '../../../storage';

export function* getTokenAsync({payload}) {
  try {
    yield put(actions.getTokenLoading());

    const res = yield axiosInstance.post('/auth/login', {
      email: payload.email,
      password: payload.password,
      rememberLogin: true,
      clientId: '123',
    });

    const {
      token,
      refreshToken: {token: refreshToken},
    } = res.data.result;

    yield call(storeData, STORAGE_KEYS.token, token);
    yield call(storeData, STORAGE_KEYS.refreshToken, refreshToken);

    yield put(actions.getTokenSuccess({token, refreshToken}));
  } catch (err) {
    console.log('ERR', err);
    yield put(actions.getTokenError(err));
  }
}

export function* registerUserAsync(action) {
  try {
    yield authInstance.post('/auth/register', {
      ...action.payload,
    });

    yield call(resolvePromiseAction, action);
  } catch (err) {
    console.log('ERR', err);
    yield call(rejectPromiseAction, action, err);
  }
}

const authSagas = [
  takeLatest(actions.GetToken.Trigger, getTokenAsync),
  takeLatest(actions.RegisterUser.PromiseTrigger, registerUserAsync),
];

export default authSagas;

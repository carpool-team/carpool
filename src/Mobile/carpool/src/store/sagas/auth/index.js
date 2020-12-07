import {takeLatest, put, call, select} from 'redux-saga/effects';
import * as actions from '../../actions/auth';
import axiosInstance from '../../../axios/authInstance';
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from '@adobe/redux-saga-promise';
import authInstance from '../../../axios/authInstance';
import {STORAGE_KEYS, storeData, removeData} from '../../../storage';
import jwt_decode from 'jwt-decode';

export function* getTokenAsync({payload}) {
  try {
    yield put(actions.getTokenLoading());

    const res = yield axiosInstance.post('/Auth/login', {
      email: payload.email,
      password: payload.password,
      rememberLogin: true,
      clientId: '123',
    });

    const {token, refreshToken} = res.data.result;

    const decoded = jwt_decode(token);

    yield call(storeData, STORAGE_KEYS.token, token);
    yield call(storeData, STORAGE_KEYS.refreshToken, refreshToken);
    yield call(storeData, STORAGE_KEYS.userId, decoded.sub.toString());

    yield put(actions.getTokenSuccess({token, refreshToken}));
  } catch (err) {
    console.log('ERR', err);
    yield put(actions.getTokenError(err));
  }
}

export function* registerUserAsync(action) {
  try {
    yield authInstance.post('/Auth/register', {
      ...action.payload,
    });

    yield call(resolvePromiseAction, action);
  } catch (err) {
    console.log('ERR', err);
    yield call(rejectPromiseAction, action, err);
  }
}

export function* logoutUserAsync() {
  try {
    yield call(removeData, STORAGE_KEYS.token);
    yield call(removeData, STORAGE_KEYS.refreshToken);

    yield put(actions.logoutUserSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* refreshTokenAsync() {
  try {
    const currentRefreshToken = yield select(
      state => state.authReducer.tokens.data.refreshToken,
    );

    if (currentRefreshToken) {
      // Fetch refresh token
      // Save new tokens in store
      // Call getTokenSuccess
      yield put(actions.logoutUser());
    } else {
      yield put(actions.logoutUser());
    }
  } catch (err) {
    console.log('ERROR', err);
    yield put(actions.logoutUser());
  }
}

const authSagas = [
  takeLatest(actions.GetToken.Trigger, getTokenAsync),
  takeLatest(actions.RegisterUser.PromiseTrigger, registerUserAsync),
  takeLatest(actions.LogoutUser.Trigger, logoutUserAsync),
  takeLatest(actions.GetToken.Refresh, refreshTokenAsync),
];

export default authSagas;

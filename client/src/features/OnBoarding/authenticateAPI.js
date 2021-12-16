import {all, call, put, takeLatest} from 'redux-saga/effects'
import { login, loginSuccess, loginFailure, signup, signupSuccess, signupFailure  } from './authenticationSlice';
import { postRequest } from 'app/axiosClient'
import { message } from 'antd';

function* loginAPI(action) {
  try {
    const response = yield call(() => postRequest('auth/login', action.payload));
    yield put(loginSuccess(response.data));
    message.success('Login Successfully.', 3);
  } catch (e) {
    yield put(loginFailure());
    message.error('Login Failure.', 3);
  }
}

function* signupAPI(action) {
  try {
    const response = yield call(() => postRequest('auth/signup', action.payload));
    yield put(signupSuccess(response.data));
    message.success('Signup Successfully.', 3);
    action.payload.history.push('/login');
  } catch (e) {
    yield put(signupFailure());
    message.error('Signup Failure.', 3);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(login, loginAPI), takeLatest(signup, signupAPI)]);
}

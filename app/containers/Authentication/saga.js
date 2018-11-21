import { call, all, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fromJS } from 'immutable';
import setAuthToken from 'utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { push } from 'connected-react-router/immutable';
import { SIGNIN_REQUEST, SIGNOUT_REQUEST } from './constants';
import { signInFailed, signInSuccess, signoutSuccess } from './actions';

function* doSignOut() {
  debugger;
  // remove token from localStorage
  Cookies.remove('token');

  // remove auth header for future request
  setAuthToken(false);

  // set current user to empty object
  yield put(signoutSuccess);
}

function* doSignIn(userData) {
  try {
    debugger;
    const res = yield call(axios.post, '/api/users/login', userData.payload);
    const { token } = res.data;

    // save to cookies
    Cookies.set('token', token, { expires: 7 });
    // localStorage.setItem('jwtToken', token);

    // set token to Auth header
    setAuthToken(token);

    // decode token to get user data
    const plainData = jwtDecode(token);

    // set current user
    yield put(signInSuccess(plainData));
    // yield put(push('/home'));
  } catch (err) {
    // set error message
    yield put(signInFailed(fromJS(err.response.data)));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(SIGNIN_REQUEST, doSignIn),
    takeLatest(SIGNOUT_REQUEST, doSignOut),
  ]);
}

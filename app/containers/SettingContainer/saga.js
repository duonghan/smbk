import { call, all, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  fetchFailed,
  fetchSuccess,
  updateFailed,
  updateSuccess,
} from './actions';
import { FETCH_PROFILE, UPDATE_PROFILE } from './constants';

function* doFetchProfile() {
  try {
    const res = yield call(axios.get, '/api/users/current');
    const profile = res.data;
    yield put(fetchSuccess(profile));
  } catch (err) {
    // set error message
    yield put(fetchFailed(err.response.data));
  }
}

function* doUpdateProfile(newProfile) {
  try {
    debugger;
    const res = yield call(axios.post, '/api/users/update', newProfile);

    debugger;

    const updatedProfile = res.data;
    yield put(updateSuccess(updatedProfile));
  } catch (err) {
    // set error message
    yield put(updateFailed(err.response.data));
  }
}

export default function* profileSaga() {
  yield all([
    takeLatest(FETCH_PROFILE, doFetchProfile),
    takeLatest(UPDATE_PROFILE, doUpdateProfile),
  ]);
}

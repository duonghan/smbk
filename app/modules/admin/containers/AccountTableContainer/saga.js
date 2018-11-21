import { take, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchFailed, fetchSuccess } from './actions';
import { FETCH_REQUEST } from './constants';

function* requestFetch() {
  try {
    const res = yield call(axios.post, '/api/users/list');

    yield put(fetchSuccess(res));
  } catch (err) {
    yield put(fetchFailed(err));
  }
}

export default function* Saga() {
  yield takeLatest(FETCH_REQUEST, requestFetch);
}

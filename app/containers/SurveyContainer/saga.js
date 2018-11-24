import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from 'utils/validation/config';
import { FETCH_SURVEY } from './constants';
import { fetchFailed, fetchSuccess } from './actions';

function* doFetchSurvey() {
  try {
    const res = yield call(axios.get, '/api/survey/list', config);
    debugger;
    const surveys = res.data;
    yield put(fetchSuccess(surveys));
  } catch (err) {
    // set error message
    yield put(fetchFailed(err.response.data));
  }
}

export default function* surveySaga() {
  yield takeLatest(FETCH_SURVEY, doFetchSurvey);
}

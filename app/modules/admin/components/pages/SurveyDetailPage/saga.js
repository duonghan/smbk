import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from 'utils/validation/config';
import { fetchResponseFailed, fetchResponseSucceed } from './actions';
import { FETCH_RESPONSE } from './constants';

function* fetchResponse(data) {
  try {
    debugger;
    const paramOpts = {
      survey: data.surveyId,
    };
    if (data.extra.length > 0) paramOpts.type = data.extra;

    const res = yield call(axios.get, `/api/survey/responses`, {
      ...config,
      params: paramOpts,
    });

    yield put(fetchResponseSucceed(res.data));
  } catch (err) {
    yield put(fetchResponseFailed(err));
  }
}

export default function* Saga() {
  yield takeLatest(FETCH_RESPONSE, fetchResponse);
}

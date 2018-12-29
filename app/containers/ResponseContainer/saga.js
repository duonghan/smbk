import { call, all, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { config } from 'utils/setAuthToken';
import { push } from 'connected-react-router';

import { initSucess, initFailed } from './actions';
import { INIT_RESPONSE, SUBMIT_RESPONSE } from './constants';

function* initResponse(initialValue) {
  try {
    const res = yield call(
      axios.post,
      '/api/survey/responses/init',
      initialValue.value,
      config,
    );
    const { id, total } = res.data;
    yield put(initSucess(id, total));
  } catch (err) {
    yield put(initFailed(err));
  }
}

function* submitResponse(data) {
  try {
    const res = yield call(
      axios.post,
      '/api/survey/responses/submit',
      {
        response: data.response,
        gender: data.gender,
        surveyId: data.surveyId,
        userId: data.userId,
      },
      config,
    );

    yield put(
      push(`/survey-result`, {
        result: res.data.result,
      }),
    );
  } catch (err) {
    console.log(err);
  }
}

export default function* responsesSaga() {
  yield all([
    takeLatest(INIT_RESPONSE, initResponse),
    takeLatest(SUBMIT_RESPONSE, submitResponse),
  ]);
}

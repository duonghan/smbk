import { take, call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import config from 'utils/validation/config';

import { initSucess, initFailed } from './actions';
import { INIT_RESPONSE } from './constants';

function* initResponse(initialValue) {
  try {
    const res = yield call(
      axios.post,
      '/api/survey/responses/init',
      config,
      initialValue,
    );
    const id = res.data;
    yield put(initSucess(id));
  } catch (err) {
    yield put(initFailed(err));
  }
}

export default function* responsesSaga() {
  yield takeLatest(INIT_RESPONSE, initResponse);
}

import { call, all, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from 'utils/validation/config';
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
      '/api/survey/responses/',
      data.response,
      config,
    );

    yield put(
      push(`/survey-result`, {
        result: res.data,
      }),
    );

    // if (data.response.get('answers').size < data.response.get('total')) {
    //   yield put(submitFailed({ message: 'ResponseNotCompleted' }));
    // } else {
    //   debugger;
    //   const res = yield call(
    //     axios.post,
    //     '/api/survey/responses/',
    //     data.response,
    //     config,
    //   );
    // }
  } catch (err) {
    console.log(err);
    // yield put(initFailed(err));
  }
}

export default function* responsesSaga() {
  yield all([
    takeLatest(INIT_RESPONSE, initResponse),
    takeLatest(SUBMIT_RESPONSE, submitResponse),
  ]);
}

import { call, all, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from 'utils/validation/config';
import { push } from 'connected-react-router/immutable';

import { CREATE_PROFILE, FETCH_SURVEY } from './constants';
import { fetchFailed, fetchSuccess } from './actions';

function* doFetchSurvey() {
  try {
    const res = yield call(axios.get, '/api/survey/all', config);
    const surveys = res.data;
    yield put(fetchSuccess(surveys));
  } catch (err) {
    // set error message
    yield put(fetchFailed(err.response.data));
  }
}

function* doCreateProfile(data) {
  try {
    const res = yield call(
      axios.post,
      '/api/mocprofiles/',
      data.profile,
      config,
    );

    const { id } = res.data;

    yield put(
      push(`/take-survey/${data.survey.name}`, {
        surveyId: data.survey._id,
        profileId: id,
      }),
    );
  } catch (err) {
    // set error message
    yield put(fetchFailed(err.response.data));
  }
}

export default function* surveySaga() {
  yield all([
    takeLatest(FETCH_SURVEY, doFetchSurvey),
    takeLatest(CREATE_PROFILE, doCreateProfile),
  ]);
}

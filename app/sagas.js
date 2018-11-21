import { call } from 'redux-saga/effects';
import authSaga from 'containers/Authentication/saga';

export default function* rootSaga() {
  yield call(authSaga);
}

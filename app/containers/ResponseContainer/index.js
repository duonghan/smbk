/**
 * Author: Duong Han
 * HUST
 * ResponseContainer
 *
 */

import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Survey from 'components/pages/survey/Survey';
import reducer from './reducer';
import saga from './saga';
import { initResponse, submitResponse } from './actions';

const mapStateToProps = state => ({
  user: state.getIn(['auth', 'user']),
  gender: state.getIn(['auth', 'user', 'gender']),
  response: state.get('response'),
  errors: state.getIn(['response', 'errors']),
});

const mapDispatchToProps = dispatch => ({
  initResponse: (surveyId, userId) => dispatch(initResponse(surveyId, userId)),
  submitResponse: (response, gender, surveyId, userId, profileId) =>
    dispatch(submitResponse(response, gender, surveyId, userId, profileId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'response', reducer });
const withSaga = injectSaga({ key: 'response', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Survey);

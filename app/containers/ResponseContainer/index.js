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
import { initResponse, resetError, submitResponse } from './actions';

const mapStateToProps = state => {
  debugger;
  return {
    userId: state.getIn(['auth', 'user', 'id']),
    response: state.get('response'),
    errors: state.getIn(['response', 'errors']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initResponse: (surveyId, userId) =>
      dispatch(initResponse(surveyId, userId)),
    submitResponse: response => dispatch(submitResponse(response)),
    resetError: () => dispatch(resetError()),
  };
};

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

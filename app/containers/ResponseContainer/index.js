/**
 * Author: Duong Han
 * HUST
 * ResponseContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Survey from 'components/pages/survey/Survey';
import reducer from './reducer';
import saga from './saga';
import { initResponse } from './actions';

const mapStateToProps = state => {
  debugger;
  return {
    userId: state.getIn(['auth', 'user', 'id']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initResponse: (surveyId, userId) =>
      dispatch(initResponse(surveyId, userId)),
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

/**
 * Author: Duong Han
 * HUST
 * QuestionContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import Question from 'components/pages/survey/Question';
import makeSelectQuestionContainer from './selectors';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  questionContainer: makeSelectQuestionContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'questionContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(Question);

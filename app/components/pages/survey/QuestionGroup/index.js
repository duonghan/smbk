/**
 * Author: Duong Han
 * HUST
 * QuestionGroup
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Question from '../Question';

const data = [];

/* eslint-disable react/prefer-stateless-function */
class QuestionGroup extends React.Component {
  render() {
    return (
      <div>
        <Question />
        <Question />
        <Question />
        <Question />
      </div>
    );
  }
}

QuestionGroup.propTypes = {};

export default QuestionGroup;

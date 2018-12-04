/**
 * Author: Duong Han
 * HUST
 * QuestionTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class QuestionTable extends React.Component {
  render() {
    return <div>{this.props.location.state.id}</div>;
  }
}

QuestionTable.propTypes = {
  location: PropTypes.object.isRequired,
};

export default QuestionTable;

/**
 * Author: Duong Han
 * HUST
 * ResultPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withRouter } from 'react-router';

import { Row, Col, Tag, Radio, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const RadioGroup = Radio.Group;
/* eslint-disable react/prefer-stateless-function */
class ResultPage extends React.Component {
  render() {
    const { result } = this.props.location.state;

    return <div>{JSON.stringify(result)}</div>;
  }
}

ResultPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ResultPage;

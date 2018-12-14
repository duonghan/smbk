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
import NeoResult from './result/neo';
import RiasecResult from './result/riasec';
import PsychologicResult from './result/psychologic';

/* eslint-disable react/prefer-stateless-function */
class ResultPage extends React.Component {
  render() {
    const { result } = this.props.location.state;
    console.log(result);

    switch (result.name) {
      case 'neo':
        return <NeoResult result={result} />;
      case 'riasec':
        return <RiasecResult result={result} />;
      case 'psychologic':
        return <PsychologicResult result={result} />;
      default:
        return <div>{JSON.stringify(result)}</div>;
    }
  }
}

ResultPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ResultPage;

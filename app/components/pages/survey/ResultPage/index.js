/**
 * Author: Duong Han
 * HUST
 * ResultPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import NeoResult from './result/neo';
import RiasecResult from './result/riasec';
import PsychologicResult from './result/psychological';
import Default from './result/default';

/* eslint-disable react/prefer-stateless-function */
class ResultPage extends React.Component {
  render() {
    const { result } = this.props.location.state;

    switch (result.name) {
      case 'neo':
        return <NeoResult result={result} />;
      case 'riasec':
        return <RiasecResult result={result} />;
      case 'psychological':
        return <PsychologicResult result={result} />;
      default:
        return <Default />;
    }
  }
}

ResultPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ResultPage;

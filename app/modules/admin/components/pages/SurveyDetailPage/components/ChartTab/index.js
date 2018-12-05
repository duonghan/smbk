/**
 * Author: Duong Han
 * HUST
 * ChartTab
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

import PsychologicChart from './components/PsychologicChart/Loadable';
import NeoChart from './components/NeoChart/Loadable';
import RiasecChart from './components/RiasecChart/Loadable';
import MocChart from './components/MocChart/Loadable';

const renderResponse = surveyName => {
  switch (surveyName) {
    case 'psychologic_test':
      return <PsychologicChart />;
    case 'neo':
      return <NeoChart />;
    case 'riasec':
      return <RiasecChart />;
    case 'moc':
      return <MocChart />;
    default:
      return <MocChart />;
  }
};

/* eslint-disable react/prefer-stateless-function */
class ChartTab extends React.Component {
  render() {
    return <div>{renderResponse(this.props.surveyName)}</div>;
  }
}

ChartTab.propTypes = {
  intl: intlShape.isRequired,
  surveyName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  surveyId: state.getIn(['surveyDetail', 'surveyId']),
  surveyName: state.getIn(['surveyDetail', 'surveyName']),
});

export default connect(mapStateToProps)(injectIntl(ChartTab));

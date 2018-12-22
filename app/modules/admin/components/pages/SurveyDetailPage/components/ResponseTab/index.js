/**
 * Author: Duong Han
 * HUST
 * ResponseTab
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Button } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

import PsychologicTable from './components/PsychologicTable/Loadable';
import NeoTable from './components/NeoTable/Loadable';
import RiasecTable from './components/RiasecTable/Loadable';
import MocTable from './components/MocTable/Loadable';

const renderResponse = surveyName => {
  switch (surveyName) {
    case 'psychological':
      return <PsychologicTable />;
    case 'neo':
      return <NeoTable />;
    case 'riasec':
      return <RiasecTable />;
    case 'moc':
      return <MocTable />;
    default:
      return <MocTable />;
  }
};

/* eslint-disable react/prefer-stateless-function */
class ResponseTab extends React.Component {
  render() {
    return <div>{renderResponse(this.props.surveyName)}</div>;
  }
}

ResponseTab.propTypes = {
  intl: intlShape.isRequired,
  surveyName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  surveyName: state.getIn(['surveyDetail', 'surveyName']),
});

export default connect(mapStateToProps)(injectIntl(ResponseTab));

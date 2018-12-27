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

import axios from 'axios';
import config from 'utils/validation/config';

import PsychologicalChart from './components/PsychologicalChart/Loadable';
import NeoChart from './components/NeoChart/Loadable';
import RiasecChart from './components/RiasecChart/Loadable';
import MocChart from './components/MocChart/Loadable';

const renderResponse = (surveyName, fetchedData) => {
  switch (surveyName) {
    case 'psychological':
      return <PsychologicalChart fetchedData={fetchedData} />;
    case 'neo':
      return <NeoChart fetchedData={fetchedData} />;
    case 'riasec':
      return <RiasecChart fetchedData={fetchedData} />;
    case 'moc':
      return <MocChart />;
    default:
      return <MocChart />;
  }
};

/* eslint-disable react/prefer-stateless-function */
class ChartTab extends React.Component {
  state = {
    fetchedData: [],
  };

  componentDidMount() {
    this.fetchData(this.props.surveyName);
  }

  fetchData = surveyName => {
    axios.get(`/api/chart/${surveyName}`, config).then(res => {
      console.log(
        `${surveyName} has fetched data is ${res.data.datasets[1].data}`,
      );
      this.setState({ fetchedData: res.data });
    });
  };

  render() {
    return (
      <div>{renderResponse(this.props.surveyName, this.state.fetchedData)}</div>
    );
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

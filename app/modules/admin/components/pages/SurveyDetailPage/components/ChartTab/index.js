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
  state = {
    fetchedData: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get('/api/chart/psychological', config).then(res => {
      const fetchedData = {
        labels: [],
        datasets: [],
      };
      fetchedData.labels = res.data[0][1].map(item => item[0]);

      res.data.map((item, index) => {
        fetchedData.datasets[index] = {
          label: '',
          data: [],
        };

        fetchedData.datasets[index].label = item[0];
        fetchedData.datasets[index].data = item[1].map(_ => _[1]);
      });

      this.setState({
        fetchedData,
      });
    });
  };

  render() {
    return <div>{renderResponse(this.props.surveyName, this.state.fetchedData)}</div>;
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

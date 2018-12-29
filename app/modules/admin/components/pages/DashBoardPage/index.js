/**
 *
 * Admin
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Row, Col, Skeleton, Card } from 'antd';
import axios from 'axios';
import { config } from 'utils/setAuthToken';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import NumberCard from './components/NumberCard';
import ResponseChart from './components/ResponseChart';

const cardColor = {
  '0': '#f33334',
  '1': '#f29b1d',
  '2': '#4cba6b',
  '3': '#3ebfbb',
};

/* eslint-disable react/prefer-stateless-function */
class DashBoardPage extends React.Component {
  state = {
    status: {
      question: 0,
      response: 0,
      survey: 0,
      user: 0,
    },
    loading: true,
  };

  componentDidMount() {
    this.fetchStatusList();
  }

  fetchStatusList = () => {
    axios.get('/api/survey/responses/statusList', config).then(res => {
      this.setState({ status: res.data });
    });
  };

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Row gutter={24}>
        <Helmet title={formatMessage(messages.header)} />

        {Object.entries(this.state.status).map((item, index) => (
          <Col key={index} lg={6} md={12} sm={12}>
            <NumberCard
              title={formatMessage(messages[`${item[0]}StatTitle`])}
              number={item[1]}
              color={cardColor[index]}
            />
          </Col>
        ))}

        <br />

        <ResponseChart />
      </Row>
    );
  }
}

DashBoardPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DashBoardPage);

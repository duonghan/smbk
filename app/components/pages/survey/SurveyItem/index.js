/**
 * Author: Duong Han
 * HUST
 * SurveyItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Card } from 'antd';
import { FormattedMessage } from 'react-intl';
import FormattedTime from 'utils/time/formatTime';
// import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class SurveyItem extends React.Component {
  render() {
    return (
      <Card
        hoverable
        title={this.props.title}
        style={{ marginTop: 40 }}
        loading={this.props.loading}
        extra={
          <Link to={`/take-survey/${this.props.name}`}>
            <FormattedMessage {...messages.takeSurvey} />
          </Link>
        }
      >
        <p>
          <FormattedMessage {...messages.type} /> : {this.props.name}
        </p>
        <p>
          <FormattedMessage {...messages.date} /> :{' '}
          {FormattedTime(this.props.date)}
        </p>
        <p>
          <FormattedMessage {...messages.lastUpdate} /> :{' '}
          {FormattedTime(this.props.lastUpdate)}
        </p>
        <p>
          <FormattedMessage {...messages.userCount} /> :
          {this.props.users.length}
        </p>
      </Card>
    );
  }
}

SurveyItem.propTypes = {
  title: PropTypes.string,
};

export default SurveyItem;

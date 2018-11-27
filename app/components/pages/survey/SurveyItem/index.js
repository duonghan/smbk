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
import { Link } from 'react-router-dom';
import messages from './messages';

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
          <Link to={`/take-survey/${this.props.name}/${this.props._id}`}>
            <FormattedMessage {...messages.takeSurvey} />
          </Link>
        }
      >
        <p>{this.props.description}</p>
      </Card>
    );
  }
}

SurveyItem.propTypes = {
  title: PropTypes.string,
};

export default SurveyItem;

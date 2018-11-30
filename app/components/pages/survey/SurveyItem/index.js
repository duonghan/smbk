/**
 * Author: Duong Han
 * HUST
 * SurveyItem
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Card, Badge } from 'antd';
import { FormattedMessage } from 'react-intl';
// import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { setCurrentSurvey } from 'containers/HomePageContainer/actions';
import Cover from 'images/neo_survey_cover.png';
import messages from './messages';

const { Meta } = Card;

/* eslint-disable react/prefer-stateless-function */
class SurveyItem extends React.Component {
  render() {
    return (
      <Badge count="new">
        <Card
          hoverable
          loading={this.props.loading}
          cover={
            <img
              alt="example"
              src={this.props.cover}
              style={{ width: '100%', height: 'auto' }}
            />
          }
          extra={
            <Link
              to={`/take-survey/${this.props.name}/${this.props._id}`}
              onClick={() => this.props.setCurrentSurvey(this.props.index)}
            >
              <FormattedMessage {...messages.takeSurvey} />
            </Link>
          }
        >
          <Meta
            title={this.props.title}
            description={
              this.props.description.length <= 120
                ? this.props.description
                : `${this.props.description.substring(0, 120)}...`
            }
          />
        </Card>
      </Badge>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentSurvey: order => dispatch(setCurrentSurvey(order)),
});

SurveyItem.propTypes = {
  title: PropTypes.string,
};

export default connect(
  null,
  mapDispatchToProps,
)(SurveyItem);

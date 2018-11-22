/**
 * Author: Duong Han
 * HUST
 * SurveyItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Card, Icon } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class SurveyItem extends React.Component {
  render() {
    return (
      <Card
        hoverable
        style={{ width: 240 }}
        title="Survey Item"
        actions={[
          <Icon type="edit" />,
          <Icon type="bar-chart" />,
          <Icon type="delete" />,
        ]}
        cover={
          <img
            alt="example"
            src="https://i.imgur.com/4P55kJE.png"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        }
      />
    );
  }
}

SurveyItem.propTypes = {};

export default SurveyItem;

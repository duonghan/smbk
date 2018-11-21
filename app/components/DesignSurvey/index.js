/**
 * Author: Duong Han
 * HUST
 * DesignSurvey
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Tabs, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// import tab components
import DesignTab from './Design';

/* eslint-disable react/prefer-stateless-function */
class DesignSurvey extends React.Component {
  render() {
    const { TabPane } = Tabs;

    return (
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="form" />
              <FormattedMessage {...messages.designTab} />
            </span>
          }
          key="1"
        >
          <DesignTab />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="code" />
              <FormattedMessage {...messages.editTab} />
            </span>
          }
          key="2"
        >
          <FormattedMessage {...messages.editTab} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="read" />
              <FormattedMessage {...messages.testTab} />
            </span>
          }
          key="3"
        >
          <FormattedMessage {...messages.testTab} />
        </TabPane>
      </Tabs>
    );
  }
}

DesignSurvey.propTypes = {};

export default DesignSurvey;

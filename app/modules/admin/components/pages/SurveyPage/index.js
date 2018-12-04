/**
 * Author: Duong Han
 * HUST
 * SurveyPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Tabs, Icon } from 'antd';
import messages from './messages';
// import EditableCell, { EditableContext } from '../AccountPage/EditableCell';

const { TabPane } = Tabs;

/* eslint-disable react/prefer-stateless-function */
class SurveyTable extends React.Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="2" size="small">
          <TabPane
            tab={
              <span>
                <Icon type="question-circle" />
                <FormattedMessage {...messages.questionTabTitle} />
              </span>
            }
            key="1"
          >
            Tab 1
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="flag" />
                <FormattedMessage {...messages.responseTabTitle} />
              </span>
            }
            key="2"
          >
            Tab 2
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="area-chart" />
                <FormattedMessage {...messages.chartTabTitle} />
              </span>
            }
            key="3"
          >
            Tab 2
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

SurveyTable.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.object.isRequired,
};

export default injectIntl(SurveyTable);

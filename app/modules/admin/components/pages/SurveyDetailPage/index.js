/**
 * Author: Duong Han
 * HUST
 * SurveyDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Tabs, Icon } from 'antd';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import messages from './messages';
import QuestionTab from './components/QuestionTab/Loadable';
import ResponseTab from './components/ResponseTab/Loadable';
import ChartTab from './components/ChartTab/Loadable';

import { setCurrentSurvey } from './actions';

const { TabPane } = Tabs;

/* eslint-disable react/prefer-stateless-function */
class SurveyDetailPage extends React.Component {
  componentWillMount() {
    this.props.setCurrentSurvey(
      this.props.location.state.id,
      new URLSearchParams(this.props.location.search).get('survey'),
    );
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" size="small">
          <TabPane
            tab={
              <span>
                <Icon type="project" />
                <FormattedMessage {...messages.questionTabTitle} />
              </span>
            }
            key="1"
          >
            <QuestionTab />
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
            <ResponseTab />
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
            <ChartTab />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

SurveyDetailPage.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  surveyId: state.getIn(['surveyDetail', 'surveyId']),
});

const mapDispatchToProps = dispatch => ({
  setCurrentSurvey: (surveyId, surveyName) =>
    dispatch(setCurrentSurvey(surveyId, surveyName)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'surveyDetail', reducer });
// const withSaga = injectSaga({ key: 'surveyDetail', saga });

export default compose(
  withReducer,
  withConnect,
)(injectIntl(SurveyDetailPage));

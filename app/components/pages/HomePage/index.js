/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Layout, Row, Col, Spin } from 'antd';
import SurveyItem from 'components/pages/survey/SurveyItem';
import { injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {
  componentWillMount() {
    this.props.fetchSurvey();
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Layout style={{ margin: 20 }}>
        <Helmet title={formatMessage(messages.header)} />
        <Spin spinning={this.props.loading}>
          <Row>
            {this.props.surveys &&
              this.props.surveys.map(item => {
                return (
                  <Col
                    className="gutter-row"
                    md={{ span: 10, offset: 7 }}
                    sm={{ span: 14, offset: 5 }}
                    key={item.title}
                  >
                    <SurveyItem {...item} loading={this.props.loading} />
                  </Col>
                );
              })}
          </Row>
        </Spin>
      </Layout>
    );
  }
}

HomePage.propTypes = {
  intl: intlShape.isRequired,
  surveys: PropTypes.any.isRequired,
  fetchSurvey: PropTypes.func.isRequired,
};

export default injectIntl(HomePage);

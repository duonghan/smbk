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
          <Row gutter={16}>
            {this.props.surveys &&
              this.props.surveys.map((item, index) => {
                return (
                  <Col
                    className="gutter-row"
                    md={6}
                    sm={12}
                    xs={24}
                    key={item.title}
                  >
                    <SurveyItem
                      {...item}
                      loading={this.props.loading}
                      index={index}
                    />
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

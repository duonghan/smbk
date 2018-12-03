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
import { withRouter } from 'react-router';

import messages from './messages';
import ProfileModal from './ProfileModal';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {
  state = {
    visible: false,
    currentSurvey: {},
  };

  componentWillMount() {
    this.props.fetchSurvey();
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();
      this.props.createProfile(values, this.state.currentSurvey);
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleClick = item => {
    item.requiredProfile
      ? this.setState({ visible: true, currentSurvey: item })
      : this.props.history.push(`/take-survey/${item.name}`, {
          surveyId: item._id,
        });
  };

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Layout style={{ margin: 20 }}>
        <Helmet title={formatMessage(messages.header)} />
        <ProfileModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <Spin spinning={this.props.loading}>
          <Row gutter={16} type="flex" jusify="center">
            {this.props.surveys &&
              this.props.surveys.map((item, index) => (
                <Col
                  className="gutter-row"
                  md={8}
                  sm={12}
                  xs={24}
                  key={item.title}
                  style={{ marginTop: 20 }}
                >
                  <SurveyItem
                    {...item}
                    loading={this.props.loading}
                    index={index}
                    onClick={() => this.handleClick(item)}
                  />
                </Col>
              ))}
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
  history: PropTypes.object.isRequired,
};

export default withRouter(injectIntl(HomePage));

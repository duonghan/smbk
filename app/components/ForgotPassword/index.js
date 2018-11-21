/**
 * Author: Duong Han
 * HUST
 * ForgotPassword
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import axios from 'axios';

import { Card, Row, Col, Input, Modal } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const { Search } = Input;

/* eslint-disable react/prefer-stateless-function */
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.formatMessage = this.props.intl.formatMessage;
  }

  searchEmail = email => {
    console.log(email);
    axios
      .post('/auth/forgot_password', email)
      .then(res => {
        Modal.success({
          title: this.formatMessage(messages.successTitle),
          content: this.formatMessage(messages.successMsg),
        });
      })
      .catch(err => {
        Modal.error({
          title: this.formatMessage(messages.errorTitle),
          content: this.formatMessage(messages.errorMsg),
        });
      });
  };

  render() {
    return (
      <Row type="flex" justify="center">
        <Helmet title={this.formatMessage(messages.header)}>
          <meta
            name="description"
            content="Description of ForgotPasswordPage"
          />
        </Helmet>
        <Col xs={24} sm={18} md={12} lg={10}>
          <Card style={{ padding: 20 }}>
            <h3>
              <FormattedMessage {...messages.title} />
            </h3>
            <Search
              placeholder={this.formatMessage(messages.plcEmail)}
              onSearch={value => this.searchEmail(value)}
              enterButton
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

ForgotPassword.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ForgotPassword);

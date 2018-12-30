/**
 *
 * Register
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Cookies from 'js-cookie';
import { Row, Col } from 'antd';

import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import BackgroundImage from 'images/register_image.png';
import SignupForm from './SignupForm';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Register extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;

    if (Cookies.get('token')) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Helmet title={formatMessage(messages.header)} />

        <Row type="flex" justify="space-around" align="middle">
          <Col xs={24} md={12}>
            <img
              alt="logo-banch"
              src={BackgroundImage}
              style={{ maxWidth: '80%', height: 'auto', margin: 50 }}
            />
          </Col>
          <Col xs={24} md={12}>
            <SignupForm />
          </Col>
        </Row>
      </div>
    );
  }
}

Register.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Register);

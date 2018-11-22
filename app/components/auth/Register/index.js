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
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import SignupForm from './SignupForm';

/* eslint-disable react/prefer-stateless-function */
class Register extends React.Component {
  render() {
    if (Cookies.get('token')) {
      return <Redirect to="/" />;
    }
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Col xs={24} md={12}>
          <img
            alt="logo-branch"
            src="https://i.imgur.com/4P55kJE.png"
            style={{ maxWidth: '80%', height: 'auto', margin: '50' }}
          />
        </Col>
        <Col xs={24} md={12}>
          <SignupForm />
        </Col>
      </Row>
    );
  }
}

Register.propTypes = {};

export default Register;

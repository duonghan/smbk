/**
 *
 * Footer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Layout, Row, Col } from 'antd';

import LocaleToggle from 'containers/LocaleToggle';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const { Footer } = Layout;

/* eslint-disable react/prefer-stateless-function */
class MyFooter extends React.Component {
  render() {
    return (
      <Footer className="dark bottom-bar" style={{ background: '#1373CC' }}>
        <Row type="flex" justify="center">
          <Col md={6} />
          <Col xs={24} sm={24} md={12}>
            <FormattedMessage {...messages.copyrightText} /> ©{' '}
            {new Date().getFullYear()} <span className="heart">❤</span> SMBK
          </Col>
          <Col xs={24} sm={24} md={6}>
            <LocaleToggle />
          </Col>
        </Row>
      </Footer>
    );
  }
}

MyFooter.propTypes = {};

export default MyFooter;

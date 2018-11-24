/**
 * Author: Duong Han
 * HUST
 * AdminPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Layout } from 'antd';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AdminSider from '../layout/AdminSider/Loadable';
import AdminContent from '../layout/AdminContent/Loadable';
import AdminBreadcrum from '../layout/AdminBreadcrum/Loadable';

const { Content } = Layout;

/* eslint-disable react/prefer-stateless-function */
class AdminPage extends React.Component {
  render() {
    return (
      <Layout>
        <AdminSider />
        <Layout style={{ padding: '0 24px 24px' }}>
          <AdminBreadcrum />
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <AdminContent />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

AdminPage.propTypes = {};

export default AdminPage;

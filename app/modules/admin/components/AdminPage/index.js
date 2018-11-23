/**
 * Author: Duong Han
 * HUST
 * AdminPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Layout, Menu, Breadcrumb, Icon, Divider } from 'antd';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AccountTable from '../AccountTable';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

/* eslint-disable react/prefer-stateless-function */
class AdminPage extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Admin</title>
        </Helmet>
        <Sider breakpoint="md" theme="light" collapsedWidth="0">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['update', 'statistic', 'chart']}
            style={{ borderRight: 0 }}
          >
            <SubMenu
              key="update"
              title={
                <span>
                  <Icon type="edit" />
                  <FormattedMessage {...messages.subMenuUpdate} />
                </span>
              }
            >
              <Menu.Item key="1">
                <FormattedMessage {...messages.menuItemCheck} />
              </Menu.Item>
              <Menu.Item key="2">
                <FormattedMessage {...messages.menuItemNEO} />
              </Menu.Item>
              <Menu.Item key="3">
                <FormattedMessage {...messages.menuItemRIASEC} />
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="statistic"
              title={
                <span>
                  <Icon type="calculator" />
                  <FormattedMessage {...messages.subMenuStatistic} />
                </span>
              }
            >
              <Menu.Item key="4">
                <FormattedMessage {...messages.menuItemCheck} />
              </Menu.Item>
              <Menu.Item key="5">
                <FormattedMessage {...messages.menuItemNEO} />
              </Menu.Item>
              <Menu.Item key="6">
                <FormattedMessage {...messages.menuItemRIASEC} />
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="chart"
              title={
                <span>
                  <Icon type="area-chart" />
                  <FormattedMessage {...messages.subMenuChart} />
                </span>
              }
            >
              <Menu.Item key="7">
                <FormattedMessage {...messages.menuItemCheck} />
              </Menu.Item>
              <Menu.Item key="8">
                <FormattedMessage {...messages.menuItemNEO} />
              </Menu.Item>
              <Menu.Item key="9">
                <FormattedMessage {...messages.menuItemRIASEC} />
              </Menu.Item>
            </SubMenu>
            <Divider />
            <Menu.Item key="10">
              <Icon type="user" />
              <FormattedMessage {...messages.menuItemAccount} />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <AccountTable />
          </Content>
          {/* <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          /> */}
        </Layout>
      </Layout>
    );
  }
}

AdminPage.propTypes = {};

export default AdminPage;

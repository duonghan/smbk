/**
 * Author: Duong Han
 * HUST
 * AdminSider
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Icon, Layout, Menu } from 'antd';
import messages from './messages';

const { SubMenu } = Menu;
const { Sider } = Layout;

/* eslint-disable react/prefer-stateless-function */
class AdminSider extends React.Component {
  render() {
    return (
      <Sider
        breakpoint="md"
        theme="light"
        collapsedWidth="0"
        style={{ minHeight: window.innerHeight }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          defaultOpenKeys={['update', 'statistic', 'chart']}
          style={{ borderRight: 1 }}
        >
          <Menu.Item key="dashboard">
            <Link to="/admin/dashboard">
              <Icon type="home" />
              <FormattedMessage {...messages.menuItemDashboard} />
            </Link>
          </Menu.Item>

          <SubMenu
            key="update"
            title={
              <span>
                <Icon type="setting" />
                <FormattedMessage {...messages.subMenuSurvey} />
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to="/admin/survey/check">
                <FormattedMessage {...messages.menuItemCheck} />
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin/survey/neo">
                <FormattedMessage {...messages.menuItemNEO} />
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/admin/survey/riasec">
                <FormattedMessage {...messages.menuItemRIASEC} />
              </Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="account">
            <Link to="/admin/account-list">
              <Icon type="user" />
              <FormattedMessage {...messages.menuItemAccount} />
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

AdminSider.propTypes = {};

export default AdminSider;

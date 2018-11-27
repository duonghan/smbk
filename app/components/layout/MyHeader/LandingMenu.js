import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class LandingMenu extends React.Component {
  render() {
    return (
      <Menu
        mode="horizontal"
        theme="dark"
        style={{
          float: 'right',
          backgroundColor: '#1373CC',
          lineHeight: '64px',
        }}
        selectable={false}
        onSelect={this.handleSelect}
      >
        <Menu.Item key="1">
          <Link to="/login">
            <FormattedMessage {...messages.login} />
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/register">
            <FormattedMessage {...messages.signup} />
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default LandingMenu;

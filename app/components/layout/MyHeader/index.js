import React from 'react';
import { Layout, Menu, Avatar, Row, Col, Dropdown, Icon } from 'antd';
import Logo from 'images/logo.svg';
import LogoText from 'images/logo_text.svg';

import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signoutRequest } from 'containers/Authentication/actions';
import MediaQuery from 'react-responsive';
import messages from './messages';
import { styles } from './styles';
import { PROFILE, LOGOUT, UPDATE_INFO } from './constants';
const { Header } = Layout;
const { SubMenu } = Menu;

class MainHeader extends React.Component {
  handleSelect = ({ item, key }) => key === 'LOGOUT' && this.props.doSignOut();
  debugger;

  render() {
    const menu = (
      <Menu style={{ paddingRight: 15, paddingLeft: 15 }}>
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
    return (
      <Row>
        <Header style={{ background: '#1373CC', color: 'white' }}>
          <Col span="12">
            <Link to="/">
              <img alt="logo" src={Logo} style={styles.logoImg} />
              <img alt="logo" src={LogoText} style={styles.logoImg} />
            </Link>
          </Col>
          <Col span="12">
            {!this.props.auth.get('isAuthorized') ? (
              <div
                style={{
                  float: 'right',
                  backgroundColor: '#1373CC',
                  lineHeight: '64px',
                }}
                onClick={this.handleSelect}
              >
                <MediaQuery minDeviceWidth={426}>
                  <Link
                    style={{
                      paddingRight: 10,
                      paddingLeft: 10,
                      color: '#fff',
                      textDecoration: 'none',
                    }}
                    to="/login"
                  >
                    <FormattedMessage {...messages.login} />
                  </Link>
                  <Link
                    style={{
                      paddingLeft: 10,
                      color: '#fff',
                      textDecoration: 'none',
                    }}
                    to="/register"
                  >
                    <FormattedMessage {...messages.signup} />
                  </Link>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={425}>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <Icon
                      type="menu-fold"
                      style={{ fontSize: '20px', color: '#fff' }}
                    />
                  </Dropdown>
                </MediaQuery>
              </div>
            ) : (
              <Menu
                mode="horizontal"
                theme="dark"
                style={{
                  float: 'right',
                  backgroundColor: '#1373CC',
                  lineHeight: '64px',
                }}
                selectable={false}
                onClick={this.handleSelect}
              >
                <SubMenu
                  key={PROFILE}
                  style={styles.account}
                  title={
                    <span>
                      <Avatar
                        style={{ marginRight: 10 }}
                        src={this.props.auth.getIn(['user', 'avatar'])}
                      />
                      {this.props.auth.getIn(['user', 'name'])}
                    </span>
                  }
                >
                  {!(this.props.auth.getIn(['user', 'role']) === 'GUEST') && (
                    <Menu.Item key={UPDATE_INFO}>
                      <Link to="/setting">
                        <FormattedMessage {...messages.setting} />
                      </Link>
                    </Menu.Item>
                  )}

                  <Menu.Item key={LOGOUT}>
                    <FormattedMessage {...messages.logout} />
                  </Menu.Item>
                </SubMenu>
              </Menu>
            )}
          </Col>
        </Header>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doSignOut: () => dispatch(signoutRequest()),
});

const mapStateToProps = state => ({
  auth: state.get('auth'),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainHeader);

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );
//
// const withReducer = injectReducer({ key: 'auth', reducer });
// const withSaga = injectSaga({ key: 'auth', saga });
//
// export default compose(
//   withReducer,
//   withSaga,
//   withConnect,
// )(MainHeader);

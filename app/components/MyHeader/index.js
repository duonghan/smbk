import React from 'react';
import { Layout, Menu, Avatar, Row, Col, Icon } from 'antd';
import Logo from 'images/logo.svg';
import LogoText from 'images/logo_text.svg';

import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ChangePassModal from 'components/Setting/ChangePassModal';
import messages from './messages';
import { styles } from './styles';
import {
  PROFILE,
  SETTING,
  LOGOUT,
  CHANGE_PASS,
  UPDATE_INFO,
} from './constants';

const { Header } = Layout;
const { SubMenu } = Menu;

class MainHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenChangePass: false,
    };
  }

  handleSelect = ({ item, key }) => {
    switch (key) {
      case SETTING:
        break;
      case LOGOUT:
        return this.props.doSignOut();
      case CHANGE_PASS:
        return this.setState({ isOpenChangePass: true });
      default:
    }
  };

  render() {
    debugger;
    return (
      <Row>
        <Header style={{ background: '#1373CC', color: 'white' }}>
          <ChangePassModal visible={this.state.isOpenChangePass} />
          <Col xs={12} md={12}>
            <Link to="/">
              <img alt="logo" src={Logo} style={styles.logoImg} />
              <img alt="logo" src={LogoText} style={styles.logoImg} />
            </Link>
          </Col>
          <Col xs={12} md={12}>
            {!this.props.auth.get('isAuthorized') ? (
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
                <Menu.Item key="1" className="mymenu">
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
                onSelect={this.handleSelect}
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
                  <SubMenu
                    key={SETTING}
                    title={<FormattedMessage {...messages.setting} />}
                  >
                    <Menu.Item key={CHANGE_PASS}>
                      <FormattedMessage {...messages.changePass} />
                    </Menu.Item>
                    <Menu.Item key={UPDATE_INFO}>
                      <FormattedMessage {...messages.changeInfo} />
                    </Menu.Item>
                  </SubMenu>
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

// export default MainHeader;

const mapDispatchToProps = dispatch => ({
  doSignOut: () => dispatch(),
});

const mapStateToProps = state => ({
  auth: state.get('auth'),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainHeader);

//
// const withConnect = connect(
//   null,
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

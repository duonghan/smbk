import React from 'react';
import { Avatar, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signoutRequest } from 'containers/Authentication/actions';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/Authentication/saga';
import reducer from 'containers/Authentication/reducer';

import messages from './messages';
import { LOGOUT, PROFILE, UPDATE_INFO } from './constants';
import { styles } from './styles';

const { SubMenu } = Menu;

class MainMenu extends React.Component {
  handleSelect = ({ item, key }) => key === LOGOUT && this.props.doSignOut();

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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doSignOut: () => dispatch(signoutRequest()),
});

const withConnect = connect(mapDispatchToProps);

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MainMenu);

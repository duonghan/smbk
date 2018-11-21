/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
// Import decode token package
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

import Landing from 'components/Landing';
import MyHeader from 'components/MyHeader';
import MyFooter from 'components/MyFooter';
import RegisterPage from 'components/Register';
import MainApp from 'components/MainApp';
import NotFoundPage from 'components/NotFoundPage';
import AdminPage from 'modules/admin/components/DashBoard';
import AddNewSurvey from 'components/AddNewSurvey';
import saga from 'containers/Authentication/saga';
import LoginPage from 'containers/Authentication/Login';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
// import messages from './messages';
import './styles.css';

const { Content } = Layout;
const height = window.innerHeight;

const Container = styled.div`
  margin: 85px 75px;
`;

class App extends React.Component {
  isLogged = () => {
    return Cookies.get('token');
  };

  isAdmin = () => {
    if (Cookies.get('token')) {
      const userInfo = jwtDecode(Cookies.get('token'));
      return userInfo.role === 'ADMIN';
    }

    return false;
  };

  render() {
    debugger;

    return (
      <Layout>
        <MyHeader />
        <Content style={{ minHeight: height }}>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                this.isAdmin() ? (
                  <AdminPage />
                ) : this.isLogged() ? (
                  <MainApp />
                ) : (
                  <Landing />
                )
              }
            />
            <Container>
              <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                {/*<Route*/}
                  {/*path="/home"*/}
                  {/*render={() => (this.isAdmin() ? <AdminPage /> : <MainApp />)}*/}
                {/*/>*/}
                {/*<Route path="/home" component={MainApp} />*/}
                {/*<Route path="/admin" component={AdminPage} />*/}
                <Route path="/add" component={AddNewSurvey} />
                <Route component={NotFoundPage} />
              </Switch>
            </Container>
          </Switch>
        </Content>
        <MyFooter />
      </Layout>
    );
  }
}

export default withRouter(App);

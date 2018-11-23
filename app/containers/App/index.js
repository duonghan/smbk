/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

// Import decode token package
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

// Import pages
import Landing from 'components/pages/Landing/Loadable';
import MyHeader from 'components/layout/MyHeader';
import MyFooter from 'components/layout/MyFooter';
import RegisterPage from 'components/auth/Register';
import MainApp from 'components/pages/MainApp/Loadable';
import NotFoundPage from 'components/pages/NotFoundPage/Loadable';
import AdminPage from 'modules/admin/components/DashBoard';
import AddNewSurvey from 'components/pages/survey/AddNewSurvey';
import ForgotPassword from 'components/auth/ForgotPassword/Loadable';
import ResetPassword from 'components/auth/ResetPassword/Loadable';
import Setting from 'containers/SettingContainer/Loadable';
import LoginPage from 'containers/Authentication/Login';

import './styles.css';

const { Content } = Layout;
const height = window.innerHeight;

const Container = styled.div`
  margin: 85px 75px;
`;

class App extends React.Component {
  isLogged = () => Cookies.get('token');

  isAdmin = () => {
    if (Cookies.get('token')) {
      const userInfo = jwtDecode(Cookies.get('token'));
      return userInfo.role === 'ADMIN';
    }

    return false;
  };

  render() {
    return (
      <Layout>
        <MyHeader />
        <Content style={{ minHeight: height }}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (this.isAdmin()) {
                  return <AdminPage />;
                }
                if (this.isLogged()) {
                  return <MainApp />;
                }
                return <Landing />;
              }}
            />
            <Container>
              <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route
                  exact
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Route path="/auth/reset-password" component={ResetPassword} />
                <Route exact path="/add" component={AddNewSurvey} />
                <Route
                  exact
                  path="/setting"
                  render={() => {
                    if (this.isLogged()) {
                      return <Setting />;
                    }
                    return <Redirect to="/" />;
                  }}
                />
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

/**
 * Author: Duong Han
 * HUST
 * AdminContent
 *
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoard from '../../pages/DashBoard';
import AccountPage from '../../pages/AccountPage/Loadable';
import SurveyPage from '../../pages/SurveyPage/Loadable';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class AdminContent extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/admin/dashboard" component={DashBoard} />
        <Route exact path="/admin/account-list" component={AccountPage} />
        <Route path="/admin/survey" component={SurveyPage} />
        <Route component={DashBoard} />
      </Switch>
    );
  }
}

AdminContent.propTypes = {};

export default AdminContent;

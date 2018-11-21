/**
 *
 * Admin
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Divider } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AccountTable from '../AccountTable';

/* eslint-disable react/prefer-stateless-function */
class Admin extends React.Component {
  render() {
    return (
      <div>
        <Divider>
          <h2>
            <FormattedMessage {...messages.tableTitle} />
          </h2>
        </Divider>
        <AccountTable />
      </div>
    );
  }
}

Admin.propTypes = {};

export default Admin;

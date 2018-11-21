/**
 *
 * NotFoundPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Icon } from 'antd';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Icon type="frown-o" style={{ fontSize: 55 }} />
        <h1>
          <FormattedMessage {...messages.msg} />
        </h1>
      </div>
    );
  }
}

NotFound.propTypes = {};

export default NotFound;

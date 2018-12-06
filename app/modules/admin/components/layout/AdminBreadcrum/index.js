/**
 * Author: Duong Han
 * HUST
 * AdminBreadcrum
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class AdminBreadcrum extends React.Component {
  constructor(props) {
    super(props);

    this.breadcrumbNameMap = {
      '/admin': 'Admin',
      '/admin/dashboard': 'Dashboard',
      '/admin/survey': 'Survey',
      '/admin/survey/check': 'Check',
      '/admin/survey/neo': 'NEO',
      '/admin/survey/riasec': 'RIASEC',
      '/admin/survey/detail': 'Detail',
    };
  }

  render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{this.breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [<Breadcrumb.Item key="home" />].concat(
      extraBreadcrumbItems,
    );

    return (
      <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
    );
  }
}

AdminBreadcrum.propTypes = {
  location: PropTypes.object,
};

export default withRouter(AdminBreadcrum);

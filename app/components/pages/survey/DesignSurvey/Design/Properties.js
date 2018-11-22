/**
 * Author: Duong Han
 * HUST
 * DesignSurvey
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { List } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const data = ['size', 'color', 'align', 'visible', 'anchor'];

class Properties extends React.Component {
  render() {
    return (
      <List
        size="small"
        header={
          <div>
            <FormattedMessage {...messages.propertiesHeader} />
          </div>
        }
        bordered
        dataSource={data}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    );
  }
}

export default Properties;

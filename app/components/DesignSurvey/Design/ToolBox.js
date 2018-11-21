/**
 * Author: Duong Han
 * HUST
 * DesignSurvey
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ToolBoxItem from './ToolBoxItem';
import { data } from './MenuToolbox';

const ToolBox = () => (
  <div
    style={{
      padding: 10,
      border: '1px solid grey',
      margin: '10px 10px 10px 10px',
      borderRadius: 5,
    }}
  >
    <FormattedMessage {...messages.toolboxHeader} />
    {data.map(item => (
      <ToolBoxItem item={item} key={item.id} />
    ))}
  </div>
);

export default ToolBox;

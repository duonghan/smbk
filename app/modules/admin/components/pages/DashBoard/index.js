/**
 *
 * Admin
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Row, Col, Card, Divider } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AccountTable from '../AccountPage';
import NumberCard from './components/NumberCard';

const numbers = [
  { icon: '', color: '', title: '', number: 100, countUp: {}, key: '1' },
  { icon: '', color: '', title: '', number: 100, countUp: {}, key: '2' },
  { icon: '', color: '', title: '', number: 100, countUp: {}, key: '3' },
  { icon: '', color: '', title: '', number: 100, countUp: {}, key: '4' },
];
const numberCards = numbers.map(item => (
  <Col key={item.key} lg={6} md={12}>
    <NumberCard {...item} />
  </Col>
));

/* eslint-disable react/prefer-stateless-function */
class Admin extends React.Component {
  render() {
    return <Row gutter={24}>{numberCards}</Row>;
  }
}

Admin.propTypes = {};

export default Admin;

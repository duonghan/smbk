/**
 * Author: Duong Han
 * HUST
 * Survey
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Row, Col, Steps, BackTop, Anchor, Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const { Step } = Steps;
const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 0; i < 100; i += 1) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const { Link } = Anchor;

/* eslint-disable react/prefer-stateless-function */
class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  render() {
    const { current } = this.state;
    return (
      <Row>
        <Col span={4}>
          <Steps current={1} direction="vertical" size="small" status="error">
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </Col>
        <Col span={16}>
          <div className="steps-content">
            {steps[current].content}
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 50 }}
              scroll={{ y: 240 }}
            />
          </div>
        </Col>
        <Col span={4}>
          <Anchor>
            <Link href="#components-anchor-demo-basic" title="Basic demo" />
            <Link href="#components-anchor-demo-fixed" title="Fixed demo" />
            <Link href="#API" title="API">
              <Link href="#Anchor-Props" title="Anchor Props" />
              <Link href="#Link-Props" title="Link Props" />
            </Link>
          </Anchor>
        </Col>
        <BackTop />
      </Row>
    );
  }
}

Survey.propTypes = {};

export default Survey;

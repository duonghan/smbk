/**
 * Author: Duong Han
 * HUST
 * DesignSurvey
 *
 */

import React from 'react';

import { Row, Col } from 'antd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import ToolBox from './ToolBox';
import Playground from './Playground';
import Properties from './Properties';

const DesignTab = () => (
  <Row gutter={8}>
    <Col span={6}>
      <ToolBox />
    </Col>
    <Col span={12}>
      <Playground />
    </Col>
    <Col span={6}>
      <Properties />
    </Col>
  </Row>
);

export default DragDropContext(HTML5Backend)(DesignTab);

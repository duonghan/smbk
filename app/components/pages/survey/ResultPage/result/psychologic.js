import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// import styled from 'styled-components';

import { Row, Col, Tag, Table, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

const colorTag = [
  {
    name: 'Nguy cơ',
    color: 'gold',
  },
  {
    name: 'Phiếu trống',
    color: 'geekblue',
  },
  {
    name: 'Nên gặp chuyên gia',
    color: 'red',
  },
  {
    name: 'Không gặp vấn đề',
    color: 'green',
  },
];

class PsychologicResult extends React.Component {
  render() {
    const resultPsychologic = this.props.result;
    const data = resultPsychologic.result.map((item, index) => ({
      key: index,
      ...item,
    }));

    console.log(data);

    const columns = [
      {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        render: key => key + 1,
        sorter: (a, b) => a < b,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
        sorter: (a, b) => a.description.localeCompare(b.description),
        render: text => (
          <span>
            <Tag
              color={
                colorTag[colorTag.findIndex(obj => obj.name === text)].color
              }
            >
              {text}
            </Tag>
          </span>
        ),
      },
    ];

    return (
      <div style={{ textAlign: 'center', backgroundColor: 'white' }}>
        <h2>
          <FormattedMessage {...messages.thanks} />
        </h2>
        <h2>
          <FormattedMessage {...messages.resultTitle} />
        </h2>

        <Row type="flex" justify="center" style={{ margin: 20 }}>
          <Col>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
      </div>
    );
  }
}
export default withRouter(PsychologicResult);

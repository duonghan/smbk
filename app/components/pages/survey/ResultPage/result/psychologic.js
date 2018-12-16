import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// import styled from 'styled-components';

import { Row, Col, Tag, Table, Button } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Line } from 'react-chartjs-2';
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
const dataChart = {
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 55, 40, 80, 81, 56],
    },
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [56, 55, 40, 65, 59, 80, 81],
    },
  ],
};

class PsychologicResult extends React.Component {
  render() {
    const resultPsychologic = this.props.result;
    const { formatMessage } = this.props.intl;
    const data = resultPsychologic.result.map((item, index) => ({
      key: index,
      ...item,
    }));

    dataChart.labels = resultPsychologic.result.map((item, index) => index + 1);

    const columns = [
      {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        render: key => key + 1,
        sorter: (a, b) => a < b,
      },
      {
        title: formatMessage(messages.psychologicNameLabel),
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: formatMessage(messages.psychologicLevelLabel),
        key: 'description',
        dataIndex: 'description',
        align: 'center',
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
          <Col md={16}>
            <Line data={dataChart} />
          </Col>
        </Row>

        <Row type="flex" justify="center" style={{ margin: 20 }}>
          <Col md={16}>
            <Table bordered columns={columns} dataSource={data} />
          </Col>
        </Row>
      </div>
    );
  }
}

PsychologicResult.propTypes = {
  intl: intlShape.isRequired,
};

export default withRouter(injectIntl(PsychologicResult));

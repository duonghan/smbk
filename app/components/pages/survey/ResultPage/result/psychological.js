import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// import styled from 'styled-components';
import TaskCompleted from 'images/task-complete.png';
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
    name: 'Bạn chưa trả lời',
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

const datasetDefault = color => ({
  fill: false,
  lineTension: 0.1,
  backgroundColor: color,
  borderColor: color,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: color,
  pointHoverBorderColor: color,
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
});

class PsychologicResult extends React.Component {
  render() {
    const resultPsychologic = this.props.result;
    const { formatMessage } = this.props.intl;

    const lowerData = { label: formatMessage(messages.lowerLabel), data: [] };
    const upperData = { label: formatMessage(messages.upperLabel), data: [] };
    const valueData = { label: formatMessage(messages.valueLabel), data: [] };

    const data = resultPsychologic.result.map((item, index) => {
      lowerData.data.push(item.lower);
      upperData.data.push(item.upper);
      valueData.data.push(item.value);

      return {
        key: index,
        ...item,
      };
    });

    const dataChart = {
      datasets: [
        { ...datasetDefault('#4cba6b'), ...lowerData },
        { ...datasetDefault('#f33334'), ...upperData },
        { ...datasetDefault('#367dc4'), ...valueData },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: formatMessage(messages.yAxesLabel),
              fontColor: '#f33334',
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: formatMessage(messages.xAxesLabel),
              fontColor: '#f29b1d',
            },
          },
        ],
      },
    };

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
        <h1 className="task-completed">
          <FormattedMessage {...messages.thanks} />
        </h1>
        <img src={TaskCompleted} alt="task-completed-icon" />
        <br />
        <h3 className="task-completed">
          <FormattedMessage {...messages.resultTitle} />
        </h3>

        <br />

        <Row type="flex" justify="center" style={{ margin: 20 }}>
          <Col md={16}>
            <Line data={dataChart} options={options} />
          </Col>
        </Row>

        <br />

        <Row type="flex" justify="center" style={{ margin: 20 }}>
          <Col md={16}>
            <Table bordered columns={columns} dataSource={data} />
          </Col>
        </Row>

        <Button type="primary" onClick={() => this.props.history.replace('/')}>
          <FormattedMessage {...messages.backHomeBtn} />
        </Button>
      </div>
    );
  }
}

PsychologicResult.propTypes = {
  intl: intlShape.isRequired,
};

export default withRouter(injectIntl(PsychologicResult));

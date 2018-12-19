import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import config from 'utils/validation/config';

import messages from '../messages';

const data = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  datasets: [
    {
      label: 'Phản hồi',
      type: 'line',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-2',
    },
    {
      type: 'bar',
      label: 'Người dùng',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      hoverBackgroundColor: '#50b4df',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-1',
    },
  ],
};

const options = {
  responsive: true,
  tooltips: {
    mode: 'label',
  },
  elements: {
    line: {
      fill: false,
    },
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false,
        },
        scaleLabel: {
          display: true,
          labelString: 'Tháng',
          fontColor: '#fb6f62',
        },
      },
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false,
        },
        labels: {
          show: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'Số lượng người dùng đăng ký',
          fontColor: '#71B37C',
        },
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          display: false,
        },
        labels: {
          show: true,
        },
        ticks: {
          suggestedMin: 0,
        },
        scaleLabel: {
          display: true,
          labelString: 'Số lượng phản hồi',
          fontColor: '#EC932F',
        },
      },
    ],
  },
};

/* eslint-disable react/prefer-stateless-function */
class ResponseChart extends React.Component {
  fetchUserPerMonth = () => {
    axios.get('/api/chart/dashboard/user', config).then(res => {
      if (res.data.length > 0) {
        res.data[0].monthlyusage.map(item => {
          data.datasets[1].data[item.month - 1] = item.count;
        });

        console.log(res.data);
      }
    });
  };

  fetchResponseMonth = () => {
    axios.get('/api/chart/dashboard/response', config).then(res => {
      if (res.data.length > 0) {
        res.data[0].monthlyusage.map(item => {
          data.datasets[0].data[item.month - 1] = item.count;
        });

        console.log(res.data);
      }
    });
  };

  componentDidMount() {
    this.fetchUserPerMonth();
    this.fetchResponseMonth();
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center', marginTop: 20 }}>
          <FormattedMessage {...messages.responseChartHeader} />
        </h2>

        <br />

        <Bar data={data} options={options} />
      </div>
    );
  }
}

export default ResponseChart;

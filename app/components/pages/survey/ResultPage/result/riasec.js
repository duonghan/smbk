import React from 'react';
import { withRouter } from 'react-router';
import { Radar } from 'react-chartjs-2';
// import styled from 'styled-components';
import TaskCompleted from 'images/task-complete.png';
import { Row, Col, Button } from 'antd';

import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

class RiasecResult extends React.Component {
  render() {
    const resultRiasec = this.props.result;
    const firstField = resultRiasec.resultIndex[resultRiasec.orderedKeys[0]];
    const secondField = resultRiasec.resultIndex[resultRiasec.orderedKeys[1]];

    const chartData = _.values(resultRiasec.result);
    const chartLabel = _.keys(resultRiasec.result).map(
      key => resultRiasec.resultIndex[key].name,
    );

    const data = {
      labels: chartLabel,
      datasets: [
        {
          label: 'Điểm số',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: chartData,
        },
      ],
    };

    return (
      <Row
        style={{
          margin: 40,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 5,
        }}
        type="flex"
        justify="center"
      >
        <div style={{ textAlign: 'center' }}>
          <h1 className="task-completed">
            <FormattedMessage {...messages.thanks} />
          </h1>
          <img src={TaskCompleted} alt="task-completed-icon" />
          <br />
          <h3 className="task-completed">
            <FormattedMessage {...messages.resultTitle} />
          </h3>
          <p>
            <FormattedMessage {...messages.riasecEntrytTitleBegin} />
            <strong>{` ${firstField.name} `}</strong>
            <FormattedMessage {...messages.riasecEntrytConjTitle} />
            <strong>{` ${secondField.name} `}</strong>
          </p>
        </div>

        <Col
          style={{
            border: '1px solid #2db7f5',
            margin: 20,
            padding: 20,
            borderRadius: 3,
          }}
        >
          <p>
            <strong>{firstField.name}</strong>
          </p>

          <i>{firstField.text}</i>
        </Col>

        <Col
          style={{
            border: '1px solid #2db7f5',
            margin: 20,
            padding: 20,
            borderRadius: 3,
          }}
        >
          <p>
            <strong>{secondField.name}</strong>
          </p>

          <i>{secondField.text}</i>
        </Col>

        <Radar data={data} />

        <Button
          type="primary"
          onClick={() => this.props.history.replace('/')}
          style={{ marginTop: 40 }}
        >
          <FormattedMessage {...messages.backHomeBtn} />
        </Button>
      </Row>
    );
  }
}
export default withRouter(RiasecResult);

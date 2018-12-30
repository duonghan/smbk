import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// import styled from 'styled-components';
import TaskCompleted from 'images/task-complete.png';
import { Row, Col, Tag, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

class NeoResult extends React.Component {
  render() {
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
        </div>

        {Object.values(this.props.result)
          .filter((_, index, arr) => index < arr.length - 1)
          .map((item, index) => (
            <Col
              style={{
                border: '1px solid #2db7f5',
                margin: 20,
                padding: 20,
                borderRadius: 3,
              }}
              key={index}
            >
              <strong>{item.name}</strong>
              <Tag color={item.level.color} style={{ marginLeft: 10 }}>
                {item.level.text}
              </Tag>

              <br />

              <i>{item.description}</i>
            </Col>
          ))}

        <Button type="primary" onClick={() => this.props.history.replace('/')}>
          <FormattedMessage {...messages.backHomeBtn} />
        </Button>
      </Row>
    );
  }
}
export default withRouter(NeoResult);

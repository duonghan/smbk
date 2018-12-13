import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router'

// import styled from 'styled-components';

import { Row, Col, Tag, Radio, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

const RadioGroup = Radio.Group;

class NeoResult extends React.Component {
  state = {
    gender: 'male',
  };

  onSelectGender = e => {
    this.setState({
      gender: e.target.value,
    });
  };

  onBackHome = () => <Redirect to="/" />;

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
          <h2>
            <FormattedMessage {...messages.thanks} />
          </h2>
          <h2>
            <FormattedMessage {...messages.resultTitle} />
          </h2>
          <h2>
            <FormattedMessage {...messages.selectGenderLabel} />
          </h2>

          <RadioGroup onChange={this.onSelectGender} value={this.state.gender}>
            <Radio value="male">
              <FormattedMessage {...messages.maleOpt} />
            </Radio>
            <Radio value="female">
              <FormattedMessage {...messages.femaleOpt} />
            </Radio>
          </RadioGroup>
        </div>

        {this.props.result[this.state.gender].map(item => (
          <Col
            style={{
              border: '1px solid #2db7f5',
              margin: 20,
              padding: 20,
              borderRadius: 3,
            }}
          >
            <p>
              <strong>{item.name}</strong>
              <Tag color={item.level.color} style={{ marginLeft: 10 }}>
                {item.level.text}
              </Tag>
            </p>

            <i>{item.description}</i>
          </Col>
        ))}

        <Button type="primary" onClick={this.onBackHome}>
          <FormattedMessage {...messages.backHomeBtn} />
        </Button>
      </Row>
    );
  }
}
export default NeoResult;

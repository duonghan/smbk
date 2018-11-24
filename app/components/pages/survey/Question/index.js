/**
 * Author: Duong Han
 * HUST
 * Question
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Steps, Button, Card, Radio } from 'antd';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const data = {
  name: 'Em bị khô miệng',
  answers: ['Không bao giờ', 'Thi thoảng', 'Thường xuyên', 'Rất thường xuyên'],
};

const RadioGroup = Radio.Group;

/* eslint-disable react/prefer-stateless-function */
class Question extends React.Component {
  state = {
    value: 1,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <Card>
        <h3>{data.name}</h3>
        <br />
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          {data.answers.map(item => (
            <Radio style={radioStyle} value={1}>
              {item}
            </Radio>
          ))}
        </RadioGroup>
      </Card>
    );
  }
}

Question.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Question);

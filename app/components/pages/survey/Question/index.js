/**
 * Author: Duong Han
 * HUST
 * Question
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Steps, Button, Card, Radio } from 'antd';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const RadioGroup = Radio.Group;

/* eslint-disable react/prefer-stateless-function */
class Question extends React.Component {
  state = {
    score: 0,
  };
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      score: e.target.value,
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { answers } = this.props;
    debugger;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <p>
        <strong>{this.props.content}</strong>
        <br />
        <RadioGroup onChange={this.onChange}>
          {this.props.answers.map((item, index) => (
            <Radio style={radioStyle} value={item.score}>
              {item.text}
            </Radio>
          ))}
        </RadioGroup>
      </p>
    );
  }
}

Question.propTypes = {
  intl: intlShape.isRequired,
  content: PropTypes.string,
};

export default injectIntl(Question);

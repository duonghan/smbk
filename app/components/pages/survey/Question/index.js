/**
 * Author: Duong Han
 * HUST
 * Question
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Steps, Button, Card, Radio, Rate, Icon } from 'antd';

const RadioGroup = Radio.Group;

/* eslint-disable react/prefer-stateless-function */
class Question extends React.Component {
  state = {
    score: 0,
  };

  onChange = e => {
    this.setState({
      score: e.target.value,
    });
  };

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <p>
        <strong>{this.props.content}</strong>
        <br />
        {this.props.inputType !== 'rate' ? (
          <RadioGroup onChange={this.onChange}>
            {this.props.answers.map((item, index) => (
              <Radio style={radioStyle} value={item.score}>
                {item.text}
              </Radio>
            ))}
          </RadioGroup>
        ) : (
          <div>
            {`${this.props.answers[0].text} | `}
            <Rate
              character={<Icon type="like" />}
              count={this.props.answers.length}
              defaultValue={1}
              allowClear={false}
              style={{ color: '#1373cc' }}
            />
            {` | ${this.props.answers[this.props.answers.length - 1].text}`}
          </div>
        )}
      </p>
    );
  }
}

Question.propTypes = {
  content: PropTypes.string,
  inputType: PropTypes.string,
  answers: PropTypes.array,
};

export default Question;

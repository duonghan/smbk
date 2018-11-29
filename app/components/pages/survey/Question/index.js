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
import { addAnswer } from 'containers/ResponseContainer/actions';
import connect from 'react-redux/es/connect/connect';

const RadioGroup = Radio.Group;

/* eslint-disable react/prefer-stateless-function */
class Question extends React.Component {
  state = {
    isSelected: false,
  };

  onChange = e => {
    this.setState(prevState => ({ isSelected: true }));

    this.props.addAnswer({
      questionId: this.props.id,
      orderNum: this.props.orderNumber,
      score: e.target.value,
    });
  };

  onChangeRate = value => {
    this.setState(prevState => ({ isSelected: true }));

    this.props.addAnswer({
      questionId: this.props.id,
      orderNum: this.props.orderNumber,
      score: value,
    });
  };

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <div>
        <strong style={{ color: this.state.isSelected && 'brown' }}>
          {this.props.content}
        </strong>
        <br />
        {this.props.inputType !== 'rate' ? (
          <RadioGroup onChange={this.onChange}>
            {this.props.answers.map((item, index) => (
              <Radio style={radioStyle} value={item.score} key={index}>
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
              defaultValue={0}
              onChange={this.onChangeRate}
              allowClear={false}
              style={{ color: '#1373cc' }}
            />
            {` | ${this.props.answers[this.props.answers.length - 1].text}`}
          </div>
        )}
      </div>
    );
  }
}

Question.propTypes = {
  content: PropTypes.string,
  inputType: PropTypes.string,
  answers: PropTypes.array,
  addAnswer: PropTypes.func.isRequired,
};

// export default Question;

const mapDispatchToProps = dispatch => ({
  addAnswer: answer => dispatch(addAnswer(answer)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Question);

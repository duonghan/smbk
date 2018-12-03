/**
 * Author: Duong Han
 * HUST
 * Question
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Steps, Button, Card, Radio, Rate, Icon, Input, Checkbox } from 'antd';
import { addAnswer } from 'containers/ResponseContainer/actions';
import connect from 'react-redux/es/connect/connect';

const RadioGroup = Radio.Group;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

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

  onChangeCheckbox = checkedValues => {
    console.log('checked = ', checkedValues);
  };

  renderQuestion = type => {
    console.log(type);
    switch (type) {
      case 'radio':
        return (
          <RadioGroup onChange={this.onChange}>
            {this.props.answers.map((item, index) => (
              <Radio
                style={{
                  display: 'block',
                  height: '30px',
                  lineHeight: '30px',
                }}
                value={item.score}
                key={index}
              >
                {item.text}
              </Radio>
            ))}
          </RadioGroup>
        );
      case 'rate':
        return (
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
        );
      case 'text-area':
        return <TextArea autosize={{ minRows: 4, maxRows: 6 }} />;
      case 'select':
        console.log('asdasdasd');
        const options = this.props.answers.map(item => ({
          label: item.text,
          value: item.score,
        }));

        return (
          <CheckboxGroup options={options} onChange={this.onChangeCheckbox} />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div
        style={{
          border: '1px solid',
          borderColor: this.state.isSelected ? 'brown' : 'black',
          borderRadius: 5,
          padding: 10,
          margin: 10,
        }}
      >
        <strong style={{ color: this.state.isSelected && 'brown' }}>
          {this.props.content}
        </strong>
        <br />
        {this.renderQuestion(this.props.inputType)}
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

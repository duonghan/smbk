/**
 * Author: Duong Han
 * HUST
 * Question
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Radio, Rate, Icon, Input, Checkbox } from 'antd';
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

  handleAddAnswer = value => {
    this.props.addAnswer({
      questionId: this.props.id,
      groupId: this.props.groupId,
      orderNum: this.props.orderNumber,
      score: value,
    });
  };

  onChangeRadio = e => {
    this.setState(prevState => ({ isSelected: true }));

    this.handleAddAnswer(e.target.value);
  };

  onChangeRate = value => {
    this.setState(prevState => ({ isSelected: true }));

    this.handleAddAnswer(value);
  };

  onChangeCheckbox = e => {
    this.setState(prevState => ({ isSelected: e.target.checked }));

    this.handleAddAnswer(e.target.checked ? 1 : 0);
  };

  onChangeTextArea = e => {
    this.handleAddAnswer(e.target.value);
  };

  renderQuestion = type => {
    switch (type) {
      case 'radio':
        return (
          <div>
            <strong style={{ color: this.state.isSelected && 'brown' }}>
              {this.props.content}
            </strong>
            <br />

            <RadioGroup onChange={this.onChangeRadio}>
              {this.props.answers.map(item => (
                <Radio
                  style={{
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                  }}
                  value={item.score}
                  key={item._id}
                >
                  {item.text}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        );
      case 'rate':
        return (
          <div>
            <strong style={{ color: this.state.isSelected && 'brown' }}>
              {this.props.content}
            </strong>

            <br />

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
        return (
          <TextArea
            autosize={{ minRows: 4, maxRows: 6 }}
            onChange={this.onChangeTextArea}
          />
        );
      case 'select':
        return (
          <Checkbox onChange={this.onChangeCheckbox}>
            {this.props.content}
          </Checkbox>
        );

      default:
        return null;
    }
  };

  render() {
    return (
      <div
        style={{
          margin: 10,
        }}
      >
        {this.renderQuestion(this.props.inputType)}
      </div>
    );
  }
}

Question.propTypes = {
  content: PropTypes.string,
  inputType: PropTypes.string,
  id: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired,
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

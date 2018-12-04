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

  onChangeCheckbox = e => {
    this.setState(prevState => ({ isSelected: e.target.checked }));

    this.props.addAnswer({
      questionId: this.props.id,
      orderNum: this.props.orderNumber,
      score: e.target.checked ? 1 : 0,
    });
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
        return <TextArea autosize={{ minRows: 4, maxRows: 6 }} />;
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

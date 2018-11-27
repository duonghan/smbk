/**
 * Author: Duong Han
 * HUST
 * QuestionGroup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import axios from 'axios';
import { Spin } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Question from '../Question';

/* eslint-disable react/prefer-stateless-function */
class QuestionGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answerOptions: [],
      loading: true,
    };
  }

  componentWillMount() {
    this.fetchQuestions(this.props.id);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.prefix !== this.props.prefix) {
  //     this.setState(prevState => ({
  //       prevLength: prevState.questions.length,
  //     }));
  //   }
  // }

  fetchQuestions = id => {
    axios.get(`/api/survey/questions/list/${id}`).then(res => {
      this.setState({
        questions: res.data.questions,
        answerOptions: res.data.optionAnswers,
        inputType: res.data.inputType,
        loading: false,
      });
    });
  };

  render() {
    return (
      <Spin spinning={this.state.loading}>
        {this.state.questions.length > 0 &&
          this.state.questions.map((question, index) => (
            <Question
              content={
                this.props.prefix
                  ? `${this.props.prefix}.${index + 1}. ${question.content}`
                  : `${index + 1}. ${question.content}`
              }
              answers={this.state.answerOptions}
              inputType={this.state.inputType}
            />
          ))}
      </Spin>
    );
  }
}

QuestionGroup.propTypes = {
  id: PropTypes.string,
  prefix: PropTypes.string,
};

export default QuestionGroup;

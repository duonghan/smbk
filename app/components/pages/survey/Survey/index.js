/**
 * Author: Duong Han
 * HUST
 * Survey
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import axios from 'axios';
import Helmet from 'react-helmet';

import {
  Row,
  Col,
  BackTop,
  Spin,
  Collapse,
  Button,
  Progress,
  Affix,
} from 'antd';
import config from 'utils/validation/config';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import QuestionGroup from '../QuestionGroup';

const { Panel } = Collapse;

/* eslint-disable react/prefer-stateless-function */
class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      groups: [],
      errors: '',
      percent: 0,
      loading: true,
      surveyTitle: '',
      surveyDescription: '',
      surveyName: '',
      activeKey: '0',
    };
  }

  componentDidMount() {
    this.getCurrentSurveyName(this.props.location.state.surveyId);
    this.fetchQuestionGroups(this.props.location.state.surveyId);

    debugger;
    this.props.initResponse({
      surveyId: this.props.location.state.surveyId,
      userId: this.props.userId,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percent: Math.round(
        (nextProps.response.get('answers').size /
          this.props.response.get('total')) *
          100,
      ),
    });
  }

  fetchQuestionGroups = surveyId => {
    axios
      .get(`/api/survey/question-groups/list/${surveyId}`, config)
      .then(res => {
        this.setState({
          groups: res.data.filter(item => !item.parent),
          loading: false,
        });
      })
      .catch(errors => this.setState({ errors }));
  };

  getCurrentSurveyName = id => {
    axios.get(`/api/survey?id=${id}`, config).then(res => {
      this.setState({
        surveyTitle: res.data.title,
        surveyDescription: res.data.description,
      });
    });
  };

  onChange = key => {
    this.setState({ activeKey: key });
  };

  render() {
    debugger;
    return (
      <Row>
        <Spin spinning={this.state.loading}>
          <Helmet title={this.state.surveyTitle} />
          <Affix>
            <Progress percent={this.state.percent} status="active" />
          </Affix>
          <Col
            md={{ span: 14, offset: 5 }}
            sm={{ span: 20, offset: 2 }}
            xs={24}
            style={{
              border: '1px solid black',
              borderRadius: 5,
              padding: 20,
              backgroundColor: 'white',
              minHeight: window.innerHeight,
            }}
          >
            <h1 style={{ textAlign: 'center' }}>
              {this.state.surveyTitle.toUpperCase()}
            </h1>
            <br />
            <h4 style={{ textAlign: 'center' }}>
              <i>{this.state.surveyDescription}</i>
            </h4>
            {this.state.groups.length > 1
              ? this.state.groups.map((item, index) => (
                  <Collapse
                    accordion
                    activeKey={this.state.activeKey}
                    bordered={false}
                    defaultActiveKey="0"
                    onChange={this.onChange}
                    key={index}
                  >
                    <Panel key={index} header={`${index + 1}. ${item.name}`}>
                      {item.childs && item.childs.length > 0 ? (
                        item.childs.map((leaf, i) => (
                          <Collapse
                            bordered={false}
                            defaultActiveKey="0"
                            key={leaf._id}
                          >
                            <Panel
                              key={`${index}_${i}`}
                              header={`${index + 1}.${i + 1}. ${leaf.name}`}
                            >
                              <QuestionGroup
                                group={leaf}
                                prefix={`${index + 1}.${i + 1}`}
                              />
                            </Panel>
                          </Collapse>
                        ))
                      ) : (
                        <QuestionGroup group={item} prefix={`${index + 1}`} />
                      )}
                    </Panel>
                  </Collapse>
                ))
              : this.state.groups.map((item, index) => (
                  <QuestionGroup group={item} key={index} />
                ))}
            <Button
              type="primary"
              style={{ marginTop: 20 }}
              onClick={() => this.props.submitResponse(this.props.response)}
            >
              Submit
            </Button>
          </Col>

          <BackTop />
        </Spin>
      </Row>
    );
  }
}

Survey.propTypes = {
  match: PropTypes.object.isRequired,
  initResponse: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  response: PropTypes.object.isRequired,
};

export default Survey;

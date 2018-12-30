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
import Cookies from 'js-cookie';

import {
  Row,
  Col,
  BackTop,
  Spin,
  Collapse,
  Button,
  Progress,
  Affix,
  message,
} from 'antd';
import { config } from 'utils/setAuthToken';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import QuestionGroup from '../QuestionGroup';
import GenderSelectDialog from './GenderSelectDialog';

const { Panel } = Collapse;

/* eslint-disable react/prefer-stateless-function */
class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      percent: 0,
      loading: true,
      submitting: false,
      surveyTitle: '',
      surveyName: '',
      surveyDescription: '',
      activeKey: '0',
      visible: false,
    };
  }

  componentDidMount() {
    this.getCurrentSurveyName(this.props.location.state.surveyId);
    this.fetchQuestionGroups(this.props.location.state.surveyId);
    const initialResponse = {
      surveyId: this.props.location.state.surveyId,
      userId: this.props.userId,
    };

    this.props.initResponse(initialResponse);
  }

  // set percent of completed answers for progress bar
  componentWillReceiveProps(nextProps) {
    // number of completed response
    const numCompleted = nextProps.response
      .get('answers')
      .valueSeq()
      .reduce((acc, cur) => acc + cur.size, 0);

    // total questions
    const total = this.props.response.get('total');

    this.setState({
      percent: Math.round((numCompleted / total) * 100),
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
      .catch(errors => console.log(errors));
  };

  getCurrentSurveyName = surveyId => {
    axios.get(`/api/survey?id=${surveyId}`, config).then(res => {
      this.setState({
        surveyTitle: res.data.title,
        surveyName: res.data.name,
        surveyDescription: res.data.description,
      });
    });
  };

  // Modal
  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.props.submitResponse(
        this.props.response,
        values.gender,
        this.props.location.state.surveyId,
        this.props.user.get('id'),
      );
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  // -- end

  onChange = key => {
    this.setState({ activeKey: key });
  };

  handleSubmit = () => {
    this.setState({
      submitting: true,
    });

    // number of completed response
    const numCompleted = this.props.response
      .get('answers')
      .valueSeq()
      .reduce((acc, cur) => acc + cur.size, 0);

    // total questions
    const total = this.props.response.get('total');

    // when survey as moc and moc2
    if (this.state.surveyName === 'moc' || this.state.surveyName === 'moc2') {
      const profileId = Cookies.get('profileId');
      debugger;
      this.props.submitResponse(
        this.props.response,
        this.props.gender,
        this.props.location.state.surveyId,
        this.props.user.get('id'),
        profileId,
      );

      debugger;

      return;
    }

    if (numCompleted < total) {
      message.error(this.props.intl.formatMessage(messages.errMessage));
      this.setState({
        submitting: false,
      });
    } else if (this.props.user.get('role') !== 'GUEST') {
      this.props.submitResponse(
        this.props.response,
        this.props.gender,
        this.props.location.state.surveyId,
        this.props.user.get('id'),
      );
    } else {
      this.setState({ visible: true });
    }
  };

  render() {
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
                    <Panel key={item._id} header={`${index + 1}. ${item.name}`}>
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
              loading={this.state.submitting}
              style={{ marginTop: 20 }}
              onClick={this.handleSubmit}
            >
              <FormattedMessage {...messages.submitBtn} />
            </Button>
          </Col>

          <GenderSelectDialog
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />

          <BackTop />
        </Spin>
      </Row>
    );
  }
}

Survey.propTypes = {
  initResponse: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  response: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default injectIntl(Survey);

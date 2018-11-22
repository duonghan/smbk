/**
 * Author: Duong Han
 * HUST
 * AddNewSurvey
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Steps, Button, message } from 'antd';

import DesignSurvey from 'components/pages/survey/DesignSurvey';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import * as styles from './styles';
import AddTitleForm from './AddTitle';

const { Step } = Steps;

/* eslint-disable react/prefer-stateless-function */
class AddNewSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      title: '',
    };
  }

  next = () => {
    this.setState(prevState => ({
      current: prevState.current + 1,
    }));
  };

  prev = () => {
    this.setState(prevState => ({
      current: prevState.current - 1,
    }));
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  render() {
    const { current } = this.state;
    const { formatMessage } = this.props.intl;

    const steps = [
      {
        title: formatMessage(messages.initStep),
        content: (
          <AddTitleForm
            onChange={this.handleChangeTitle}
            title={this.state.title}
          />
        ),
      },
      { title: formatMessage(messages.editStep), content: <DesignSurvey /> },
      { title: formatMessage(messages.publishStep), content: 'Last-content' },
    ];
    return (
      <div>
        <h2>
          <FormattedMessage {...messages.preTitle} />
          {this.state.title}
        </h2>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={styles.stepsContent}>{steps[current].content}</div>
        <div style={styles.stepsAction}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={this.next}>
              <FormattedMessage {...messages.nextBtn} />
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success(formatMessage(messages.doneMsg))}
            >
              <FormattedMessage {...messages.doneBtn} />
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={this.prev}>
              <FormattedMessage {...messages.prevBtn} />
            </Button>
          )}
        </div>
      </div>
    );
  }
}

AddNewSurvey.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AddNewSurvey);

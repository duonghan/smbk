/**
 * Author: Duong Han
 * HUST
 * QuestionTab
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Button } from 'antd';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import AddQuestionForm from './AddQuestionForm';
import GroupTable from './components/GroupTable/Loadable';
import QuestionTable from './components/QuestionTable/Loadable';
import { setCurrentSurvey } from '../../actions';
import connect from 'react-redux/es/connect/connect';

/* eslint-disable react/prefer-stateless-function */
class QuestionTab extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <div style={{ marginBottom: 30 }}>
          <Button type="primary" onClick={this.showModal}>
            <FormattedMessage {...messages.addQuestion} />
          </Button>

          <Button
            type="primary"
            onClick={this.showModal}
            style={{ marginLeft: 20 }}
          >
            <FormattedMessage {...messages.addGroup} />
          </Button>
        </div>

        <AddQuestionForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />

        <GroupTable />
        <QuestionTable />
      </div>
    );
  }
}

QuestionTab.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  surveyId: state.getIn(['surveyDetail', 'surveyId']),
});

export default connect(mapStateToProps)(injectIntl(QuestionTab));

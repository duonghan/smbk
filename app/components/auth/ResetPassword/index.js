/**
 * Author: Duong Han
 * HUST
 * ResetPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import axios from 'axios';
// import styled from 'styled-components';
import { Form, Card, Row, Col, Input, Modal, Button, Icon } from 'antd';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;

/* eslint-disable react/prefer-stateless-function */
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.formatMessage = this.props.intl.formatMessage;
    this.state = { confirmDirty: false, visible: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    const currentUrl = this.props.location.pathname;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post(currentUrl, { password: values.password })
          .then(res => {
            // Modal.success({
            //   title: this.formatMessage(messages.successTitle),
            //   content: this.formatMessage(messages.successMsg),
            // });
            this.setState({ visible: true });
          })
          .catch(err => {
            Modal.error({
              title: this.formatMessage(messages.errorTitle),
              content: this.formatMessage(messages.errorMsg),
            });
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState(prevState => ({
      confirmDirty: prevState.confirmDirty || !!value,
    }));
  };

  handleOk = e => {
    this.props.history.push('/login');
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(this.formatMessage(messages.compareToFirstPassword));
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
    };

    return (
      <Row type="flex" justify="center">
        <Helmet title={this.formatMessage(messages.header)}>
          <meta name="description" content="Description of ResetPasswordPage" />
        </Helmet>
        <Col xs={24} sm={18} md={12} lg={10}>
          <Card style={{ padding: 20 }}>
            <h2>
              <FormattedMessage {...messages.title} />
            </h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem
                {...formItemLayout}
                label={this.formatMessage(messages.password)}
                hasFeedback
              >
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: this.formatMessage(messages.requiredPassword),
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                    {
                      min: 6,
                      message: this.formatMessage(messages.validateLenPassword),
                    },
                  ],
                })(<Input type="password" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={this.formatMessage(messages.confirmPassword)}
                hasFeedback
              >
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: this.formatMessage(messages.validatePassword),
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  <FormattedMessage {...messages.btnTitle} />
                </Button>
              </FormItem>
            </Form>
          </Card>
        </Col>

        <Modal
          title={this.formatMessage(messages.successTitle)}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="ok" type="primary" onClick={this.handleOk}>
              <FormattedMessage {...messages.returnLogin} />
            </Button>,
          ]}
        >
          <FormattedMessage {...messages.successMsg} />
        </Modal>
      </Row>
    );
  }
}

ResetPassword.propTypes = {
  intl: intlShape.isRequired,
  form: PropTypes.object,
};

export default injectIntl(Form.create()(ResetPassword));

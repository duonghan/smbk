/**
 * Author: Duong Han
 * HUST
 * Setting
 *
 */
import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Collapse,
  Switch,
  Button,
  AutoComplete,
  Checkbox,
} from 'antd';
import ChangePasswordForm from './ChangePassForm';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;
const Panel = Collapse.Panel;

const Title = styled.h1`
  display: block;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 25px;
`;

class SettingForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    isChangePass: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`,
      );
    }
    this.setState({ autoCompleteResult });
  };

  toggleChangePassword = checked => {
    debugger;
    this.setState({ isChangePass: checked });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: formatMessage(messages.validateEmail),
              },
              {
                required: true,
                message: formatMessage(messages.requiredEmail),
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.name)}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: formatMessage(messages.requiredName),
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage(messages.changePassword)}
        >
          {getFieldDecorator('switch', {
            valuePropName: 'checked',
            initalValue: this.state.isChangePass,
          })(<Switch onChange={this.toggleChangePassword} />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={formatMessage(messages.currentPassword)}
        >
          {getFieldDecorator('currentPassword', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input disabled={!this.state.isChangePass} type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input disabled={!this.state.isChangePass} type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator('confirmNewPassword', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              type="password"
              disabled={!this.state.isChangePass}
              onBlur={this.handleConfirmBlur}
            />,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update Info
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(injectIntl(SettingForm));

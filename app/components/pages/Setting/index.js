/**
 * Author: Duong Han
 * HUST
 * Setting
 *
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Form, Input, Switch, Button } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';

const FormItem = Form.Item;

const Title = styled.h1`
  display: block;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 25px;
`;

class SettingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      isChangePass: false,
    };
  }

  componentWillMount() {
    this.props.onFetchProfile();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const id = this.props.auth.getIn(['user', 'id']);
        const newProfile = {
          id,
          email: values.email,
          name: values.name,
        };

        if (this.state.isChangePass) {
          newProfile.currentPassword = values.currentPassword;
          newProfile.newPassword = values.newPassword;
        }

        // update profile through saga
        this.props.onUpdateProfile(newProfile);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmNewPassword'], { force: true });
    }
    callback();
  };

  toggleChangePassword = checked => {
    this.setState({ isChangePass: checked });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;
    const { profile, errors } = this.props;

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
      <div>
        <Helmet title={formatMessage(messages.header)}>
          <meta name="description" content="Update profile information" />
        </Helmet>
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
              initialValue: profile.get('email'),
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
              initialValue: profile.get('name'),
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={formatMessage(messages.changePassword)}
          >
            {getFieldDecorator('isChangePass', {
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
                  required: this.state.isChangePass,
                  message: formatMessage(messages.requiredCurrentPassword),
                },
                {
                  validate: errors && errors.get('password'),
                  message: formatMessage(messages.incorrectCurrentPassword),
                },
              ],
            })(<Input disabled={!this.state.isChangePass} type="password" />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={formatMessage(messages.newPassword)}
          >
            {getFieldDecorator('newPassword', {
              rules: [
                {
                  required: this.state.isChangePass,
                  message: formatMessage(messages.requiredNewPassword),
                },
                {
                  validator:
                    this.state.isChangePass && this.validateToNextPassword,
                },
              ],
            })(<Input disabled={!this.state.isChangePass} type="password" />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={formatMessage(messages.labelPassword2)}
          >
            {getFieldDecorator('confirmNewPassword', {
              rules: [
                {
                  required: this.state.isChangePass,
                  message: formatMessage(messages.requiredPassword2),
                },
                {
                  validator:
                    this.state.isChangePass && this.compareToFirstPassword,
                  message: formatMessage(messages.validatePassword2),
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
              <FormattedMessage {...messages.btnSubmit} />
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

SettingForm.propTypes = {
  intl: intlShape.isRequired,
};

export default Form.create()(injectIntl(SettingForm));

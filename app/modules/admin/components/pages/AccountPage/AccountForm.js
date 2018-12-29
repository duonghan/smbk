import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Radio } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;

// eslint-disable-next-line
class AccountForm extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    const { formatMessage } = this.props.intl;

    return (
      <Modal
        visible={visible}
        title={formatMessage(messages.add)}
        okText={formatMessage(messages.save)}
        cancelText={formatMessage(messages.cancel)}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Email">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.requiredEmail),
                },
                {
                  type: 'email',
                  message: formatMessage(messages.validateEmail),
                },
              ],
              initialValue: this.props.account.email,
            })(<Input />)}
          </FormItem>

          <FormItem label={formatMessage(messages.passwordLabel)}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.requiredPassword),
                },
                {
                  min: 6,
                  message: formatMessage(messages.validatePassword),
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem label={formatMessage(messages.nameTitle)}>
            {getFieldDecorator('name', {
              rules: [
                {
                  min: 2,
                  max: 30,
                  message: formatMessage(messages.validateName),
                },
              ],
              initialValue: this.props.account.name,
            })(<Input placeholder={formatMessage(messages.nameTitle)} />)}
          </FormItem>

          <FormItem label={formatMessage(messages.genderTitle)}>
            {getFieldDecorator('gender', {
              initialValue: this.props.account.gender || 'male',
            })(
              <Radio.Group>
                <Radio value="male">
                  <FormattedMessage {...messages.male} />
                </Radio>

                <Radio value="female">
                  <FormattedMessage {...messages.female} />
                </Radio>
              </Radio.Group>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

AccountForm.propTypes = {
  intl: intlShape.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create()(injectIntl(AccountForm));

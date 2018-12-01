import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Radio, InputNumber } from 'antd';

import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import messages from './messages';

const FormItem = Form.Item;

/* eslint-disable react/prefer-stateless-function */
class ProfileModal extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { formatMessage } = this.props.intl;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title={formatMessage(messages.profileTitle)}
        okText={formatMessage(messages.saveBtn)}
        cancelText={formatMessage(messages.cancelBtn)}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label={formatMessage(messages.nameLabel)}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input the title of collection!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={formatMessage(messages.ageLabel)}>
            {getFieldDecorator('age', {
              rules: [
                {
                  required: true,
                  message: 'Please input the title of collection!',
                },
              ],
            })(<InputNumber min={1} max={200} />)}
          </FormItem>
          <FormItem label={formatMessage(messages.addressLabel)}>
            {getFieldDecorator('address')(<Input type="textarea" />)}
          </FormItem>
          <FormItem label={formatMessage(messages.genderLabel)}>
            {getFieldDecorator('gender', {
              initialValue: 'male',
            })(
              <Radio.Group>
                <Radio value="male">
                  <FormattedMessage {...messages.maleOptions} />
                </Radio>
                <Radio value="female">
                  <FormattedMessage {...messages.femaleOptions} />
                </Radio>
              </Radio.Group>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

ProfileModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default Form.create()(injectIntl(ProfileModal));

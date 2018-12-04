import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Radio, InputNumber, AutoComplete } from 'antd';

import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import messages from './messages';

const FormItem = Form.Item;

/* eslint-disable react/prefer-stateless-function */
class ProfileModal extends React.Component {
  state = {
    dataSource: [],
  };

  handleChange = value => {
    this.setState({
      dataSource:
        !value || value.indexOf('@') >= 0
          ? []
          : [
              `${value}@gmail.com`,
              `${value}@hotmail.com`,
              `${value}@outlook.com`,
              `${value}@yahoo.com`,
            ],
    });
  };

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
                  message: formatMessage(messages.requiredNameMsg),
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem label={formatMessage(messages.workUnitLabel)}>
            {getFieldDecorator('workUnit', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.requiredWorkUnitMsg),
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem label={formatMessage(messages.positionLabel)}>
            {getFieldDecorator('position', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.requiredPositionMsg),
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem label={formatMessage(messages.mainTaskLabel)}>
            {getFieldDecorator('mainTask', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.requiredMainTaskMsg),
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem label={formatMessage(messages.specialityLabel)}>
            {getFieldDecorator('speciality', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.requiredSpecialityMsg),
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem label={formatMessage(messages.personalEmailLabel)}>
            {getFieldDecorator('personalEmail', {
              rules: [
                {
                  type: 'email',
                  message: formatMessage(messages.validatePersonalEmailMsg),
                },
                {
                  required: true,
                  message: formatMessage(messages.requiredPersonalEmailMsg),
                },
              ],
            })(
              <AutoComplete
                dataSource={this.state.dataSource}
                onChange={this.handleChange}
              />,
            )}
          </FormItem>

          <FormItem label={formatMessage(messages.phoneLabel)}>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.requiredPhoneMsg),
                },
                {
                  pattern: /0+(9[0-9]|3[2-9]|7[0|6-9]|8[1-5]|5[6|8|9])+([0-9]{7})\b/,
                  message: formatMessage(messages.validatePhoneMsg),
                },
              ],
            })(<Input />)}
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

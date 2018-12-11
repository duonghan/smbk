import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Icon, Button } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;

// eslint-disable-next-line
class AddParentGroupForm extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    const { formatMessage } = this.props.intl;

    return (
      <Modal
        visible={visible}
        title={formatMessage(messages.addQuestion)}
        okText={formatMessage(messages.addBtn)}
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
                  message: formatMessage(messages.nameRequiredMsg),
                },
              ],
            })(<Input placeholder={formatMessage(messages.namePlaceholder)} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

AddParentGroupForm.propTypes = {
  intl: intlShape.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create()(injectIntl(AddParentGroupForm));

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;
const { Option } = Select;

// eslint-disable-next-line
class AddQuestionForm extends React.Component {
  handleChange = value => {
    console.log(`selected ${value}`);
  };

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
          <FormItem label={formatMessage(messages.contentLabel)}>
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.contentRequiredMsg),
                },
              ],
            })(
              <Input
                placeholder={formatMessage(messages.contentPlaceholder)}
              />,
            )}
          </FormItem>
          <p>
            <b>
              <FormattedMessage {...messages.groupLabel} />
            </b>{' '}
            : {this.props.groupName}
          </p>
        </Form>
      </Modal>
    );
  }
}

AddQuestionForm.propTypes = {
  intl: intlShape.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create()(injectIntl(AddQuestionForm));
